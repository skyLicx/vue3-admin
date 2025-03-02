<template>
  <common-box
    title="工作量"
    subTitle="患者类型分布"
  >
    <template #chart>
      <div
        class="chart"
        ref="chartRef"
      ></div>
    </template>
  </common-box>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { init } from 'echarts'
import commonBox from './commonBox.vue'
import Big from 'big.js'

const props = defineProps({
  params: {
    type: Object,
    default: () => ({})
  }
})

const chartRef = ref(null)
const myChart = ref(null)
const chartData = ref([])

const refreshChart = async () => {
  console.log(props.params)
  const res = await Promise.resolve({
    code: 0,
    data: [
      { name: '患者类型1', ratio: Math.random().toFixed(2) },
      { name: '患者类型2', ratio: Math.random().toFixed(2) },
      { name: '患者类型3', ratio: Math.random().toFixed(2) }
    ]
  })
  console.log(res, 'res')
  if (res.code == 0) {
    chartData.value = res.data.map((item) => {
      item.ratio = item.ratio || 0
      return {
        ...item,
        value: Big(item.ratio).times(100).toString()
      }
    })
  } else {
    console.error(res.msg)
  }
  if (!myChart.value) {
    myChart.value = init(chartRef.value, 'dark')
  }

  const option = {
    backgroundColor: '',
    legend: {
      icon: 'circle',
      orient: 'vertical',
      left: 10,
      top: 20,
      bottom: 20,
      data: chartData.value,
      formatter: (name) => {
        const data = chartData.value
        const target = data.filter((item) => item.name === name)[0]
        return `{name|${target.name}}{value|${target.value}%}`
      },
      textStyle: {
        backgroundColor: 'transparent',
        rich: {
          name: {
            fontSize: 12,
            align: 'left',
            width: 50,
            padding: [0, 20, 0, 0]
          },
          value: {
            fontSize: 12,
            align: 'right'
          }
        }
      }
    },
    series: [
      {
        type: 'pie',
        labelLine: {
          normal: {
            length: 10
          }
        },
        radius: ['40%', '70%'],
        center: ['70%', '50%'],
        label: {
          formatter: '{c}%'
        },
        data: chartData.value
      }
    ]
  }
  option && myChart.value.setOption(option)
}

onMounted(() => {
  refreshChart()
})

onUnmounted(() => {
  if (myChart.value) {
    myChart.value.dispose()
    myChart.value = null
  }
})

// 暴露方法供父组件调用
defineExpose({
  refreshChart
})
</script>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
