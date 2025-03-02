<template>
  <common-box title="检查效率">
    <div slot="chart" class="chart">
      <div class="field">
        <p class="value">{{ examTime  }}<span class="unit">分钟</span></p>
        <img
					class="icon"
					src="@/assets/images/visualizing/platform.png"
					alt=""
				/>
        <p class="label">检查耗时(分)</p>
      </div>
      <div class="field">
        <p class="value"><template v-if="reportTimeHour">
          {{ reportTimeHour  }}<span class="unit">小时</span>
        </template>{{ reportTimeMin  }}<span class="unit">分</span></p>
        <img
					class="icon"
					src="@/assets/images/visualizing/platform.png"
					alt=""
				/>
        <p class="label">报告耗时(时)</p>
      </div>
    </div>
  </common-box>
</template>

<script>
import commonBox from './commonBox.vue'
import { dynamicInvoke } from '@/api/dataapi'
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
      examTime: 0,
      reportTime: 0,
      reportTimeHour: 0,
      reportTimeMin: 0
    }
  },
  mounted() {},
  methods: {
    refreshData() {
      dynamicInvoke('YZ-Area-Quality-Screen_1005', this.params).then((res) => {
        if (res.code == 0) {
          this.examTime = res.data.examTime
          this.reportTime = res.data.reportTime
          const { hour, min } = this.formatHour(this.reportTime)
          this.reportTimeHour = hour
          this.reportTimeMin = min
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 分钟转小时
    formatHour(time) {
      let hour = 0
      let min = 0
      if (time < 60) {
        min = time
      } else {
        hour = Math.floor(time / 60)
        min = time % 60
      }
      return { hour, min }
    }
  }
}
</script>

<style lang="scss" scoped>
.chart {
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
}
.field {
	flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  height: 100%;
}
.label {
	color: #fff;
	font-family: PingFangSC-Medium;
	font-weight: 500;
	font-size: vh(14);
	text-align: center;
  margin-top: vh(6);
}
.value {
	font-family: PingFangSC-Medium;
	font-weight: 500;
	font-size: vh(32);
	color: #00d3ff;
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
}
.icon {
	width: vw(128);
	height: vh(53.67);
	opacity: 0.8;
}
.unit {
  font-size: vh(14);
}
</style>