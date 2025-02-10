<template>
  <div class="lineChart">
    <div ref="chartRef" class="chart"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, watchEffect } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

const chartRef = ref()
let chart
onMounted(() => {
  chart = echarts.init(chartRef.value, 'light')
  window.addEventListener('resize', function () {
    chart.resize()
  })
  watchEffect(() => {
    setEchartOptions(props.data)
  })
})

const option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985',
      },
    },
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: [],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [],
      type: 'line',
      areaStyle: {},
    },
  ],
}

function setEchartOptions(data) {
  if (!data) return
  option.xAxis.data = data.xAxisData
  option.series[0].data = data.values
  chart.setOption(option)
}
</script>

<style lang="less" scoped>
.lineChart {
  width: 100%;

  .chart {
    height: 350px;
  }
}
</style>
