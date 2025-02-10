<template>
  <div class="rosePieChart">
    <div ref="chartRef" class="chart"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, watchEffect } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  data: {
    type: Array,
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
    trigger: 'item',
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true },
    },
  },
  series: [
    {
      type: 'pie',
      radius: [20, 120],
      roseType: 'area',
      itemStyle: {
        borderRadius: 8,
      },
      data: [],
      top: 30,
    },
  ],
}

function setEchartOptions(data) {
  if (!data.length) return
  option.series[0].data = data
  chart.setOption(option)
}
</script>

<style lang="less" scoped>
.rosePieChart {
  width: 100%;

  .chart {
    height: 350px;
  }
}
</style>
