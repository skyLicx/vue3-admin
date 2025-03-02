<template>
  <common-box title="机房工作量">
    <div slot="chart" class="machine-room-main">
      <el-carousel height="100%" :interval="10000">
        <el-carousel-item
          v-for="(splitList, splitListIndex) in list"
          :key="splitListIndex"
        >
          <div class="list" v-for="itemList in splitList">
            <div class="title">
              <p>机房</p>
              <p>已预约</p>
              <p>已检查</p>
            </div>
            <div class="item" v-for="item in itemList">
              <p>{{ item.roomName }}</p>
              <p>{{ item.bookNum }}</p>
              <p>{{ item.examNum }}</p>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
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
      list: []
    }
  },
  mounted() {},
  methods: {
    listFormat() {
      let splitResult = []
      // 先按12个分
      for (let i = 0; i < this.list.length; i += 12) {
        splitResult.push(this.list.slice(i, i + 12))
      }
      let result = []
      // 然后每个按6个分
      for (let i = 0; i < splitResult.length; i++) {
        for (let j = 0; j < splitResult[i].length; j += 6) {
          let sliceData = splitResult[i].slice(j, j + 6)
          if (result[i]) {
            result[i].push(sliceData)
          } else {
            result[i] = [sliceData]
          }
        }
      }
      this.list = result
    },
    refreshData() {
      dynamicInvoke('YZ-Area-Quality-Screen_1011', this.params).then((res) => {
        if (res.code == 0) {
          this.list = res.data
          this.listFormat()
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.machine-room-main {
  height: 100%;
  width: 100%;
  color: #fff;
  font-family: PingFangSC-SNaNpxibold;
  font-size: vh(14);

  .list {
    width: vw(266);
    margin-top: vh(13);
  }
  .title {
    font-weight: 600;
    display: flex;
    background: rgba($color: #00d3ff, $alpha: 0.4);
    border-radius: 2px;
    height: vh(26);
    align-items: center;
    padding-left: vw(20);
    p {
      flex: 1;
    }
  }
  .item {
    font-weight: 400;
    display: flex;
    height: vh(26);
    align-items: center;
    padding-left: vw(20);
    border-radius: 2px;
    &:nth-child(odd) {
      background: rgba($color: #00d3ff, $alpha: 0.2);
    }
    p {
      flex: 1;
    }
  }
}
::v-deep .el-carousel {
  width: 100%;
  height: 100%;
  .el-carousel__item {
    display: flex;
    justify-content: space-between;
  }
  .el-carousel__indicators {
    display: none;
  }
}
</style>
