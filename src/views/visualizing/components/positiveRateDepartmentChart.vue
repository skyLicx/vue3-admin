<template>
  <common-box title="检查阳性率" subTitle="申请科室排行">
    <div slot="chart" class="chart" ref="chart"></div>
  </common-box>
</template>

<script>
import * as echarts from 'echarts'
import commonBox from './commonBox.vue'
import { dynamicInvoke } from '@/api/dataapi'
import Big from 'big.js'
import { nameFormat } from '../util.js'
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
        'YZ-Area-Quality-Screen_1012',
        this.params
      )
      if (res.code == 0) {
        res.data.sort((a, b) => {
          return b.ratio - a.ratio
        })
        this.chartData = res.data.map((item) => {
          item.ratio = item.ratio || 0
          return {
            name: item.depName,
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
          left: '120px',
          right: '20px',
          bottom: '0px'
        },
        xAxis: {
          type: 'value',
          min: 0,
          max: 100,
          axisLabel: {
            formatter: '{value}%'
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'category',
          inverse: true, // 反向
          data: this.chartData.map((item) => item.name),
          axisLabel: {
            interval: 0,
            formatter: (name, index) => {
              const nameStr = nameFormat(name, 6)
              const arr =
                '{number|' + 'NO.' + (index + 1) + '}{name|' + nameStr + '}'
              return arr
            },
            textStyle: {
              rich: {
                number: {
                  fontSize: 12,
                  align: 'left',
                  color: '#00D3FF'
                },
                name: {
                  fontSize: 12,
                  align: 'right',
                  width: 80
                }
              }
            }
          },
          axisTick: {
            show: false
          }
        },
        series: [
          {
            data: this.chartData,
            type: 'bar',
            barWidth: '50%',
            label: {
              show: true,
              position: 'right',
              formatter: '{c}%',
              color: '#82D0EE'
            },
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 1, color: '#1CDAE4' },
                { offset: 0, color: '#004CFF' }
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
