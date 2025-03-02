<template>
  <common-box title="质量安全">
    <div slot="chart" class="chart">
      <div class="item-chart-wrap">
        <div class="item-chart" ref="chart1"></div>
      </div>
      <div class="item-chart-wrap">
        <div class="item-chart" ref="chart2"></div>
      </div>
      <div class="item-chart-wrap">
        <div class="item-chart" ref="chart3"></div>
      </div>
      <div class="item-chart-wrap">
        <div class="item-chart" ref="chart4"></div>
      </div>
    </div>
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
      myChart: {
        chart1: null,
        chart2: null,
        chart3: null,
        chart4: null
      },
      chartData: [
        {
          title: '检查阳性率',
          value: 0
        },
        {
          title: '影像优良率',
          value: 0
        },
        {
          title: '报告优良率',
          value: 0
        },
        {
          title: '诊断符合率',
          value: 0
        }
      ]
    }
  },
  mounted() {},
  methods: {
    async refreshChart() {
      // 检查阳性率
      const promise1 = dynamicInvoke('YZ-Area-Quality-Screen_1015', this.params)
      // 影像优良率
      const promise2 = dynamicInvoke('YZ-Area-Quality-Screen_1016', this.params)
      // 报告优良率
      const promise3 = dynamicInvoke('YZ-Area-Quality-Screen_1017', this.params)
      // 诊断符合率
      const promise4 = dynamicInvoke('YZ-Area-Quality-Screen_1018', this.params)
      const resList = await Promise.all([promise1, promise2, promise3, promise4])
      for(let i = 0; i < resList.length; i++) {
        this.chartData[i].value = Big(resList[i].data.ratio || 0).times(100).toString()
      }
      let index = 0
      for (const key in this.myChart) {
        const text = this.chartData[index].title
        const value = this.chartData[index].value
        index++
        if (!this.myChart[key]) {
          this.myChart[key] = echarts.init(this.$refs[key])
        }
        const option = {
          title: {
            text: text,
            left: 'center',
            bottom: '0',
            textStyle: {
              fontSize: 16,
              color: '#fff',
              fontWeight: 400
            }
          },
          // 饼图中间显示文字
          graphic: {
            type: 'text',
            left: 'center',
            top: '40%',
            style: {
              text: value + '%', // 文字内容
              fill: '#fff', // 文字颜色
              fontSize: 16 // 文字字号
            }
          },
          series: [
            // 内环
            {
              type: 'pie',
              radius: ['52%', '74%'],
              center: ['50%', '42%'],
              startAngle: 90,
              labelLine: {
                show: false
              },
              hoverAnimation: false,
              animation: false,
              silent: true,
              data: [100],
              itemStyle: {
                color: '#5C6F92'
              }
            },
            // 进度环
            {
              type: 'pie',
              radius: ['46%', '80%'],
              center: ['50%', '42%'],
              startAngle: 90,
              labelLine: {
                show: false
              },
              itemStyle: {
                color: '#009CFF'
              },
              data: [
                { value: value },
                // 剩余的渲染为透明
                {
                  value: 100 - value,
                  itemStyle: {
                    color: 'none',
                    decal: {
                      symbol: 'none'
                    }
                  }
                }
              ]
            }
          ]
        }
        option && this.myChart[key].setOption(option)
      }
    }
  },
  destroyed() {
    for (const key in this.myChart) {
      if (!this.myChart[key]) continue
      this.myChart[key].dispose()
      this.myChart[key] = null
    }
  }
}
</script>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
.item-chart-wrap {
  width: 25%;
  height: 100%;
}
.item-chart {
  width: 100%;
  height: 100%;
}
</style>
