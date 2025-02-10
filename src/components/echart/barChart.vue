<template>
  <div class="barChart">
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
  },
  xAxis: {
    type: 'category',
    data: [],
  },
  yAxis: {
    type: 'value',
  },
  dataZoom: [
    {
      type: 'inside',
    },
    {
      type: 'slider',
    },
  ],
  series: [
    {
      data: [],
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)',
      },
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
.barChart {
  width: 100%;

  .chart {
    height: 350px;
  }
}
</style>
