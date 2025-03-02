<template>
  <div class="common-box">
    <img
      class="icon-border left-top"
      :src="imgSrc"
    />
    <img
      class="icon-border left-bottom"
      :src="imgSrc"
    />
    <img
      class="icon-border right-top"
      :src="imgSrc"
    />
    <img
      class="icon-border right-bottom"
      :src="imgSrc"
    />
    <div class="header-wrap">
      <div class="title-wrap">
        <img
          class="icon-title"
          src="@/assets/images/visualizing/icon_title.png"
          alt=""
        />
        <p class="title">
          {{ title }}
          <span v-if="subTitle"> - </span>
          <span
            v-if="subTitle"
            class="sub-title"
            >{{ subTitle }}</span
          >
        </p>
      </div>
      <slot name="headerRight"></slot>
    </div>
    <div class="chart-wrap">
      <slot name="chart"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import iconBorder1 from '@/assets/images/visualizing/icon_border1.svg'

// 定义props
interface Props {
  title?: string
  subTitle?: string
}

withDefaults(defineProps<Props>(), {
  title: '',
  subTitle: ''
})

// 数据
const imgSrc = iconBorder1
</script>

<style lang="scss" scoped>
.common-box {
  display: flex;
  flex-direction: column;
}
.header-wrap {
  position: relative;
  display: flex;
  align-items: center;
}
.title-wrap {
  display: flex;
  align-items: center;
  .icon-title {
    width: vw(19);
    height: vh(15);
  }
  .title {
    font-family: PingFangSC-Medium;
    font-weight: 500;
    font-size: vh(16);
    color: #00d3ff;
    margin-left: vw(4);
    line-height: vh(22);
    .sub-title {
      font-size: vh(14);
    }
  }
}

.icon-border {
  width: 20px;
  height: 20px;
}
.left-top {
  position: absolute;
  left: 0;
  top: 0;
}
.left-bottom {
  position: absolute;
  left: 0;
  bottom: 0;
  transform: rotateX(180deg);
}
.right-top {
  position: absolute;
  right: 0;
  top: 0;
  transform: rotateY(180deg);
}
.right-bottom {
  position: absolute;
  right: 0;
  bottom: 0;
  transform: rotateX(180deg) rotateY(180deg);
}
.common-box {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  box-shadow: inset 0 1px 20px 0 rgba(37, 245, 255, 0.3);
  box-sizing: border-box;
  padding: vh(20) vw(30);
}
.chart-wrap {
  flex: 1;
  position: relative;
}
</style>
