<template>
  <div class="visualizing-container">
    <div class="visualizing-header">
      <div class="header-bg"></div>
      <div class="title">
        <input
          class="title-input"
          type="text"
          v-model="screenTitle"
        />
      </div>
      <div class="update-date-wrapper">
        <p class="update-date">
          更新时间：{{ updateDate }}
          <i class="el-icon-refresh"></i>
        </p>
      </div>
      <div class="btn-group">
        <div
          class="btn"
          v-for="item in btnList"
          :key="item.value"
          :class="[activeBtnValue == item.value ? 'btn-active' : '']"
          @click="onTimeChange(item.value)"
        >
          <p>{{ item.label }}</p>
          <img
            v-if="activeBtnValue == item.value"
            class="btn-active-img"
            src="@/assets/images/visualizing/icon_active.png"
            alt=""
          />
        </div>
      </div>
    </div>
    <div class="visualizing-main">
      <div class="card-list">
        <div
          class="card-item"
          v-for="item in cardList"
          :key="item.title"
          :class="item.cardClass"
        >
          <div class="icon-border left-top"></div>
          <div class="icon-border left-bottom"></div>
          <div class="icon-border right-top"></div>
          <div class="icon-border right-bottom"></div>
          <div class="header-wrapper">
            <img
              class="icon"
              :src="item.icon"
              alt=""
            />
            <p class="title">{{ item.title }}</p>
          </div>
          <div class="content">
            <div class="left">
              <p class="title">{{ item.leftTitle }}</p>
              <p class="value">{{ item.leftValue }}</p>
            </div>
            <div class="right">
              <p class="title">{{ item.rightTitle }}</p>
              <p class="value">{{ item.rightValue }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="chart-main">
        <div class="data-content">
          <div class="data-left">
            <div class="flex-warp-item workload">
              <workloadChart
                ref="workloadChartRef"
                :params="params"
              />
            </div>
            <div class="flex-warp-item positive-rate-department">
              <!-- <positiveRateDepartmentChart
                ref="positiveRateDepartmentChartRef"
                :params="params"
              /> -->
            </div>
          </div>
          <div class="data-center">
            <div class="flex-warp-item exam-progress">
              <!-- <examProgress
                ref="examProgressRef"
                :params="params"
              /> -->
            </div>
            <div class="flex-warp-item cost">
              <!-- <cost
                ref="costRef"
                :params="params"
                :activeDate="activeBtnValue"
              /> -->
            </div>
            <div class="flex-warp-item exam-efficiency">
              <!-- <examEfficiency
                ref="examEfficiencyRef"
                :params="params"
              /> -->
            </div>
          </div>
          <div class="data-right">
            <div class="flex-warp-item quality-safety">
              <!-- <qualitySafetyChart
                ref="qualitySafetyChartRef"
                :params="params"
              /> -->
            </div>
            <div class="flex-warp-item machine-room">
              <!-- <machineRoom
                ref="machineRoomRef"
                :params="params"
              /> -->
            </div>
          </div>
        </div>
        <div class="data-bottom">
          <div class="flex-warp-item positive-rate-examine-type">
            <!-- <positiveRateExamineTypeChart
              ref="positiveRateExamineTypeChartRef"
              :params="params"
            /> -->
          </div>
          <div class="flex-warp-item image-excellence-rate-examine-type">
            <!-- <imageExcellenceRateExamineTypeChart
              ref="imageExcellenceRateExamineTypeChartRef"
              :params="params"
            /> -->
          </div>
          <div class="flex-warp-item report-excellent-rate-examine-type">
            <!-- <reportExcellentRateExamineTypeChart
              ref="reportExcellentRateExamineTypeChartRef"
              :params="params"
            /> -->
          </div>
          <div class="flex-warp-item department-document">
            <!-- <departmentDocument
              ref="departmentDocumentRef"
              :params="params"
            /> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import workloadChart from './components/workloadChart.vue'
// import positiveRateDepartmentChart from './components/positiveRateDepartmentChart.vue'
// import positiveRateExamineTypeChart from './components/positiveRateExamineTypeChart.vue'
// import qualitySafetyChart from './components/qualitySafetyChart.vue'
// import imageExcellenceRateExamineTypeChart from './components/imageExcellenceRateExamineTypeChart.vue'
// import reportExcellentRateExamineTypeChart from './components/reportExcellentRateExamineTypeChart.vue'
// import machineRoom from './components/machineRoom.vue'
// import examProgress from './components/examProgress.vue'
// import cost from './components/cost.vue'
// import examEfficiency from './components/examEfficiency.vue'
// import departmentDocument from './components/departmentDocument.vue'
import moment from 'moment'
// 导入图标
import iconQuality from '@/assets/images/visualizing/icon_quality.svg'
import iconStudy from '@/assets/images/visualizing/icon_study.svg'
import iconFollow from '@/assets/images/visualizing/icon_follow.svg'
import iconConsultation from '@/assets/images/visualizing/icon_consultation.svg'
import iconCritical from '@/assets/images/visualizing/icon_critical.svg'
import iconCheckAbnormal from '@/assets/images/visualizing/icon_check_abnormal.svg'
import iconReportAbnormal from '@/assets/images/visualizing/icon_report_abnormal.svg'

const updateDate = ref('')
const screenTitle = ref('数据大屏')
const timer = ref(null)
const activeBtnValue = ref('year')
const btnList = [
  {
    label: '今日',
    value: 'today'
  },
  {
    label: '本周',
    value: 'week'
  },
  {
    label: '本月',
    value: 'month'
  },
  {
    label: '本年',
    value: 'year'
  }
]
const cardList = ref([
  {
    title: '质控记录',
    cardClass: 'quality',
    icon: iconQuality,
    leftTitle: '质控会议(次)',
    rightTitle: '质控记录(次)',
    leftValue: '0',
    rightValue: '0'
  },
  {
    title: '科室学习',
    cardClass: ['study', 'small'],
    icon: iconStudy,
    leftTitle: '学习次数',
    leftValue: '0'
  },
  {
    title: '病例随访',
    cardClass: ['follow', 'small'],
    icon: iconFollow,
    leftTitle: '随访人次',
    leftValue: '0'
  },
  {
    title: '疑难会诊',
    cardClass: ['consultation', 'small'],
    icon: iconConsultation,
    leftTitle: '远程会诊(人次)',
    leftValue: '0'
  },
  {
    title: '危急报告',
    cardClass: 'critical',
    icon: iconCritical,
    leftTitle: '通报人次',
    rightTitle: '未处理人次',
    leftValue: '0',
    rightValue: '0'
  },
  {
    title: '异常检查',
    cardClass: 'check-abnormal',
    icon: iconCheckAbnormal,
    leftTitle: '检查爽约',
    rightTitle: '检查取消',
    leftValue: '0',
    rightValue: '0'
  },
  {
    title: '报告异常',
    cardClass: 'report-abnormal',
    icon: iconReportAbnormal,
    leftTitle: '报告修订次数',
    rightTitle: '报告超时份数',
    leftValue: '0',
    rightValue: '0'
  }
])
// 图表入参
const params = ref({})
const workloadChartRef = ref(null)

const onTimeChange = (value) => {
  activeBtnValue.value = value
  setParams()
  initPage()
}
const setUpdateDate = () => {
  updateDate.value = moment().format('YYYY-MM-DD HH:mm:ss')
}
const setParams = () => {
  params.value = {
    startTime: getStartTime(),
    endTime: moment().format('YYYY-MM-DD') + ' 23:59:59'
  }
}
const getStartTime = () => {
  let startDate = ''
  if (activeBtnValue.value == 'today') {
    startDate = moment().format('YYYY-MM-DD')
  } else if (activeBtnValue.value == 'week') {
    // 本周第一天 从周一开始
    startDate = moment().isoWeekday(1).format('YYYY-MM-DD')
  } else if (activeBtnValue.value == 'month') {
    startDate = moment().startOf('month').format('YYYY-MM-DD')
  } else if (activeBtnValue.value == 'year') {
    startDate = moment().startOf('year').format('YYYY-MM-DD')
  }
  return startDate + ' 00:00:00'
}
const initPage = () => {
  setUpdateDate()
  getData()
}
const getData = () => {
  cardList.value[0].leftValue = (Math.random() * 100).toFixed(0)
  cardList.value[0].rightValue = (Math.random() * 100).toFixed(0)
  // 工作量
  workloadChartRef.value?.refreshChart()
  // // 检查阳性率-申请科室排行
  // this.$refs.positiveRateDepartmentChartRef.refreshChart()
  // // 检查阳性率-检查类型对比
  // this.$refs.positiveRateExamineTypeChartRef.refreshChart()
  // // 影像优良率-检查类型对比
  // this.$refs.imageExcellenceRateExamineTypeChartRef.refreshChart()
  // // 报告优良率-检查类型对比
  // this.$refs.reportExcellentRateExamineTypeChartRef.refreshChart()
  // // 质量安全
  // this.$refs.qualitySafetyChartRef.refreshChart()
  // // 机房工作量
  // this.$refs.machineRoomRef.refreshData()
  // // 检查进程
  // this.$refs.examProgressRef.refreshData()
  // // 费用情况
  // this.$refs.costRef.refreshData()
  // // 检查效率
  // this.$refs.examEfficiencyRef.refreshData()
  // // 科室文档
  // this.$refs.departmentDocumentRef.refreshData()
}

onMounted(async () => {
  setParams()
  nextTick(() => {
    initPage()
    timer.value = setInterval(() => {
      initPage()
    }, 60 * 1000)
  })
})

onUnmounted(() => {
  clearInterval(timer.value)
  timer.value = null
})
</script>

<style lang="scss" scoped>
.visualizing-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-image: url('@/assets/images/visualizing/bg.png');
  background-size: cover;
  background-position: center;
}
.visualizing-header {
  width: 100%;
  height: vh(81);
  position: relative;

  .header-bg {
    width: 100%;
    height: vh(63);
    background-image: url('@/assets/images/visualizing/header_bg.png');
    background-size: 100% 100%;
    position: absolute;
    left: 0;
    bottom: 0;
  }
  .btn-group {
    position: absolute;
    left: vw(20);
    bottom: 0;
    display: flex;
    align-items: center;
    .btn {
      position: relative;
      width: vw(48);
      height: vh(30);
      // line-height: vh(30);
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      font-size: vh(14);
      color: #25f5ff;
      text-align: center;
      border-radius: 4px;
      border: 1px solid #25f5ff;
      box-sizing: border-box;
      cursor: pointer;
      &:not(:last-child) {
        margin-right: vw(20);
      }
    }
    .btn-active {
      border: none;
    }
    .btn-active-img {
      width: vw(48);
      height: vh(30);
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  .title {
    position: relative;
  }
  .title-input {
    width: 100%;
    border: none;
    font-family: PingFangSC-SNaNpxibold;
    font-weight: 600;
    font-size: vh(54);
    text-align: center;
    letter-spacing: 8px;
    color: transparent;
    caret-color: #fff;
    line-height: vh(50);
    background-image: linear-gradient(90deg, #3f70ff 35%, #25f5ff 50%, #3f70ff 65%);
    -webkit-background-clip: text;
    background-clip: text;
    z-index: 999;
    &:focus-visible {
      outline: 0;
    }
  }
  .update-date-wrapper {
    position: absolute;
    right: vw(20);
    bottom: 0;
    .update-date {
      font-family: PingFangSC-Medium;
      font-weight: 500;
      font-size: vh(16);
      color: #25f5ff;
    }
  }
}
.visualizing-main {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: vh(20) vw(20);
}
.card-list {
  height: vh(140);
  display: flex;
  justify-content: space-between;
  .card-item.small {
    width: vw(192);
    text-align: center;
  }
  .card-item {
    position: relative;
    width: vw(296);
    height: vh(140);
    background-size: 100% 100%;
    border-radius: 10px;
    background-image: url('@/assets/images/visualizing/other_bg1.png');
    display: flex;
    flex-direction: column;
    .icon-border {
      background: url('@/assets/images/visualizing/icon_border1.svg');
      position: absolute;
      width: 20px;
      height: 20px;
    }
    .left-top {
      left: 0;
      top: 0;
    }
    .left-bottom {
      left: 0;
      bottom: 0;
      transform: rotateX(180deg);
    }
    .right-top {
      right: 0;
      top: 0;
      transform: rotateY(180deg);
    }
    .right-bottom {
      right: 0;
      bottom: 0;
      transform: rotateX(180deg) rotateY(180deg);
    }
    .header-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      height: vh(30);
      .title {
        line-height: vh(22);
        font-family: PingFangSC-Medium;
        font-weight: 500;
        font-size: vh(16);
        color: #00fff6;
        margin-left: vw(6);
      }
    }
    .content {
      display: flex;
      flex: 1;
      margin-top: vh(16);
      margin-bottom: vh(19);
      margin-left: vw(30);
      margin-right: vw(30);
      .left {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .title {
        font-family: PingFangSC-Medium;
        font-weight: 500;
        font-size: vh(14);
        color: #00fff6;
      }
      .value {
        font-family: PingFangSC-Medium;
        font-weight: 500;
        font-size: vh(36);
        color: #00fff6;
      }
      .unit {
        font-size: vh(14);
      }
    }
    &:nth-child(n + 5) {
      background-image: url('@/assets/images/visualizing/other_bg2.png');
      .icon-border {
        background: url('@/assets/images/visualizing/icon_border2.svg');
      }
      .header-wrapper {
        .title {
          color: #ffe800;
        }
      }
      .content {
        .title,
        .value {
          color: #ffe800;
        }
      }
    }
  }
  .quality {
    .icon {
      width: vw(16);
      height: vh(17);
    }
  }
  .study {
    .icon {
      width: vw(16);
      height: vh(14);
    }
  }
  .follow {
    .icon {
      width: vw(16);
      height: vh(16);
    }
  }
  .consultation {
    .icon {
      width: vw(14);
      height: vh(16);
    }
  }
  .critical {
    .icon {
      width: vw(13.59);
      height: vh(16);
    }
  }
  .check-abnormal {
    .icon {
      width: vw(11.1);
      height: vh(16);
    }
  }
  .report-abnormal {
    .icon {
      width: vw(13.87);
      height: vh(16);
    }
  }
}

.chart-main {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.data-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: vh(20);
  margin-bottom: vh(20);
  flex: 1;
}
.flex-warp-item {
  position: relative;
  width: 100%;
  box-sizing: border-box;
}
.data-left {
  width: vw(612);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.data-center {
  width: vw(612);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.data-right {
  width: vw(614);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.data-bottom {
  width: 100%;
  height: vh(260);
  display: flex;
  justify-content: space-between;
}
.workload,
.quality-safety {
  height: vh(240);
}
.positive-rate-department,
.machine-room {
  height: vh(258);
}
.positive-rate-examine-type,
.image-excellence-rate-examine-type,
.report-excellent-rate-examine-type {
  height: vh(260);
}
.report-excellent-rate-ranking {
  height: vh(518);
}
.exam-progress,
.cost,
.exam-efficiency {
  height: vh(159);
}

.positive-rate-examine-type {
  width: vw(482);
}
.image-excellence-rate-examine-type {
  width: vw(482);
}
.report-excellent-rate-examine-type {
  width: vw(484);
}
.department-document {
  width: vw(374);
}
</style>
