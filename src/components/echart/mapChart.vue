<template>
  <div class="mapChart">
    <div ref="chartRef" class="chart"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, watchEffect } from 'vue'
import * as echarts from 'echarts'
import chinaJson from './mapData/china.json'
import { geoCoordMap } from './mapData/geoCoordMap'

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
})

echarts.registerMap('china', chinaJson)
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
  // chart.setOption(option)
})

const option = {
  backgroundColor: 'transparent',
  title: {
    text: '全国销量统计',
    left: 'center',
    textStyle: {
      color: '#000',
    },
  },
  tooltip: {
    trigger: 'item',
    // formatter: function (params) {
    //   return params.name + ' : ' + params.value[2]
    // },
  },
  geo: {
    map: 'china',
    roam: true,
    emphasis: {
      areaColor: '#f4cccc',
      borderColor: 'rgb(9, 54, 95)',
      itemStyle: {
        areaColor: '#f4cccc',
      },
    },
  },
  visualMap: {
    min: 0,
    max: 60000,
    left: 20,
    bottom: 20,
    calculable: true,
    text: ['高', '低'],
    inRange: {
      color: ['rgb(70, 240, 252)', 'rgb(250, 220, 46)', 'rgb(245, 38, 186)'],
    },
    textStyle: {
      color: '#fff',
    },
  },
  series: [
    {
      name: '销量',
      type: 'scatter',
      coordinateSystem: 'geo',
      data: [],
      symbolSize: 12,
      encode: {
        value: 2,
      },
      label: {
        formatter: '{b}',
        position: 'right',
        show: false,
      },
      emphasis: {
        label: {
          show: true,
        },
      },
    },
  ],
}

function setEchartOptions(data) {
  if (!data.length) return
  option.series[0].data = convertData(props.data)
  console.log(option)
  chart.setOption(option)
}

function convertData(data) {
  var res = []
  for (var i = 0; i < data.length; i++) {
    var geoCoord = geoCoordMap[data[i].name]
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value),
      })
    }
  }
  return res
}
</script>

<style lang="less" scoped>
.mapChart {
  width: 100%;

  .chart {
    height: 350px;
  }
}
</style>
