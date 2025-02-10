<template>
  <div class="pieChart">
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
  legend: {
    orient: 'horizontal',
    left: 'left',
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
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
.pieChart {
  width: 100%;

  .chart {
    height: 350px;
  }
}
</style>
