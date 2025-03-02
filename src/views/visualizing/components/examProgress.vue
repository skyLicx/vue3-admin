<template>
  <common-box title="检查进程">
    <div slot="chart" class="chart">
      <div class="field">
        <p class="value">{{ bookNum  }}</p>
        <img
					class="icon"
					src="@/assets/images/visualizing/platform.png"
					alt=""
				/>
        <p class="label">预约人次</p>
      </div>
      <div class="field">
        <p class="value">{{ examNum  }}</p>
        <img
					class="icon"
					src="@/assets/images/visualizing/platform.png"
					alt=""
				/>
        <p class="label">检查人次</p>
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
      bookNum: 0,
      examNum: 0
    }
  },
  mounted() {},
  methods: {
    refreshData() {
      dynamicInvoke('YZ-Area-Quality-Screen_1001', this.params).then((res) => {
        if (res.code == 0) {
          this.bookNum = res.data.bookNum
          this.examNum = res.data.examNum
        } else {
          this.$message.error(res.msg)
        }
      })
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
</style>