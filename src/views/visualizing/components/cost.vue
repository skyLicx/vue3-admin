<template>
	<common-box title="费用情况">
		<div slot="chart" class="chart">
			<div class="field">
				<p class="value">{{ money }}</p>
				<img
					class="icon"
					src="@/assets/images/visualizing/platform.png"
					alt=""
				/>
				<p class="label">检查费用（{{ unit }}）</p>
			</div>
			<div class="field">
				<p class="value">{{ greenNum }}</p>
				<img
					class="icon"
					src="@/assets/images/visualizing/platform.png"
					alt=""
				/>
				<p class="label">绿色通道人次</p>
			</div>
		</div>
	</common-box>
</template>

<script>
import commonBox from './commonBox.vue'
import { dynamicInvoke } from '@/api/dataapi'
export default {
	components: {
		commonBox,
	},
	props: {
		params: {
			type: Object,
			default: () => {},
		},
    activeDate: {
      type: String,
      default: ''
    }
	},
	data() {
		return {
			money: 0,
			greenNum: 0,
      unit: '元'
		}
	},
	mounted() {},
	methods: {
		refreshData() {
			dynamicInvoke('YZ-Area-Quality-Screen_1002', this.params).then((res) => {
				if (res.code == 0) {
					this.money = res.data.money
					this.greenNum = res.data.greenNum
          if (this.activeDate == 'year') {
            this.unit = '万元'
            this.money = this.formatMoney(this.money)
          } else {
            this.unit = '元'
          }
				} else {
					this.$message.error(res.msg)
				}
			})
		},
    // 元转万元 四舍五入
    formatMoney(money) {
      return (money / 10000).toFixed(2)
    }
	},
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
