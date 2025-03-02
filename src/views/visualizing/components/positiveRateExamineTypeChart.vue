<template>
  <common-box title="检查阳性率" subTitle="检查类型对比">
    <div slot="chart" class="chart" ref="chart"></div>
  </common-box>
</template>

<script>
import * as echarts from 'echarts'
import commonBox from './commonBox.vue'
import { dynamicInvoke } from '@/api/dataapi'
import Big from 'big.js'
export default {
  components: {
    commonBox
  },
  props: {
    params: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      myChart: null,
      chartData: []
    }
  },
  mounted() {},
  methods: {
    async refreshChart() {
      const res = await dynamicInvoke(
        'YZ-Area-Quality-Screen_1010',
        this.params
      )
      if (res.code == 0) {
        this.chartData = res.data.map((item) => {
          item.ratio = item.ratio || 0
          return {
            name: item.examType,
            value: Big(item.ratio)
              .times(100)
              .toString(),
            ...item
          }
        })
      } else {
        this.$message.error(res.msg)
      }
      if (!this.myChart) {
        this.myChart = echarts.init(this.$refs.chart, 'dark')
      }
      const option = {
        backgroundColor: '',
        grid: {
          top: '20px',
          left: '0px',
          right: '0px',
          bottom: '0px',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: this.chartData.map((item) => item.name),
          // 强制显示所有标签
          axisLabel: {
            interval: 0
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          show: true,
          min: 0,
          max: 100,
          axisLabel: {
            formatter: '{value}%'
          },
          splitLine: { show: false },
          axisLine: {
            show: true
          },
          axisTick: {
            show: false
          }
        },
        series: [
          {
            data: this.chartData,
            type: 'bar',
            barWidth: '30%',
            label: {
              show: true,
              position: 'top',
              formatter: '{c}%',
              color: '#FFE800'
            },
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                { offset: 1, color: '#FFE800' },
                { offset: 0, color: '#FDB200' }
              ])
            }
          }
        ]
      }
      option && this.myChart.setOption(option)
    }
  },
  destroyed() {
    if (!this.myChart) {
      return
    }
    this.myChart.dispose()
    this.myChart = null
  }
}
</script>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
