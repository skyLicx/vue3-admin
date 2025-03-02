<template>
  <common-box title="科室文档">
    <template #headerRight>
      <div class="btn-group">
        <div
          class="btn"
          v-for="(item, index) in btnList"
          @click="onBtnClick(index)"
          :key="item.value"
        >
          <p>{{ item.label }}</p>
          <img
            v-if="btnList[activeIndex].value == item.value"
            class="btn-active"
            src="@/assets/images/visualizing/icon_active.png"
            alt=""
          />
        </div>
      </div>
    </template>
    <template #chart>
      <div
        class="chart"
        ref="chart"
      >
        <div class="list">
          <div
            class="item"
            v-for="(item, index) in showData"
            :key="index"
          >
            <p class="text">
              <span>{{ index + 1 }}、</span>{{ item.title }}
            </p>
          </div>
        </div>
      </div>
    </template>
  </common-box>
</template>

<script>
import commonBox from './commonBox.vue'
// import { getDepartmentDocumentData } from '@/api/dataapi'
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
      activeIndex: 0,
      btnList: [
        {
          label: '职责',
          value: 'gwzz'
        },
        {
          label: '制度',
          value: 'keshizhidu2'
        },
        {
          label: '规范',
          value: 'gongzuoguifan'
        }
      ],
      dataObj: {},
      showData: [],
      timer: null
    }
  },
  mounted() {
    this.btnAutoChange()
  },
  methods: {
    btnAutoChange() {
      this.timer = setInterval(() => {
        if (this.activeIndex === this.btnList.length - 1) {
          this.activeIndex = 0
        } else {
          this.activeIndex++
        }
        const key = this.btnList[this.activeIndex].value
        this.showData = this.dataObj[key]
      }, 10 * 1000)
    },
    onBtnClick(index) {
      clearInterval(this.timer)
      this.activeIndex = index
      const key = this.btnList[this.activeIndex].value
      this.showData = this.dataObj[key]
      this.btnAutoChange()
    },
    refreshData() {
      const params = {
        site_type: 1,
        channel_parameter_list: JSON.stringify([
          {
            code: 'keshizhidu2',
            top: '6'
          },
          {
            code: 'gwzz',
            top: '6'
          },
          {
            code: 'gongzuoguifan',
            top: '6'
          }
        ])
      }
      getDepartmentDocumentData(params).then((res) => {
        if (res.code == 0) {
          const list = res.data.channel_content_list || []
          list.map((item) => {
            this.dataObj[item.channel_code] = item.content_list
          })
          const key = this.btnList[this.activeIndex].value
          this.showData = this.dataObj[key]
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  },
  unmounted() {
    clearInterval(this.timer)
    this.timer = null
  }
}
</script>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 100%;
}
.btn-group {
  display: flex;
  align-items: center;
  margin-left: auto;
  position: relative;
  .btn {
    position: relative;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    font-size: vh(12);
    color: #25f5ff;
    width: vw(48);
    height: vh(28);
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: vh(28);
    cursor: pointer;
  }
  .btn-active {
    width: vw(48);
    height: vh(28);
    position: absolute;
    top: 0;
    left: 0;
  }
}
.list {
  color: #fff;
  margin-top: vh(15);
  .item {
    height: vh(26);
    border-radius: 2px;
    font-family: PingFangSC-Regular;
    font-size: vh(14);
    display: flex;
    align-items: center;
    padding-left: vw(20);
    padding-right: vw(20);
    box-sizing: border-box;
    &:nth-child(odd) {
      background-color: rgba(0, 213, 255, 0.2);
    }
  }
  .text {
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
