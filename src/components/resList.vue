<template>
  <div :class="showList?'showList':'triple'">
    <div @click="toDetail(item.detailId)" class="item" v-for="(item,i) in itemList" :key="i">
      <!-- <div :style="{'background-image':`url('${item.img}')`}" class="img" > -->
      <div class="img">
        <div class="content">
          <img v-lazy="item.img" alt="">
        </div>
      </div>
      <div class="item-title">{{item.name|titleFilter}}</div>
      <div class="item-subtitle">{{item.name|subTitleFilter}}</div>
    </div>
  </div>
</template>

<script>
export default {
  filters: {
    titleFilter(val) {
      let arr = val.split(" ");
      if (arr.length === 2) {
        return arr[0];
      } else {
        return arr.slice(0, arr.length - 1).join(" ");
      }
    },
    subTitleFilter(val) {
      let arr = val.split(" ");
      return arr[arr.length - 1];
    }
  },
  props: {
    itemList: {
      type: Array
    },
    showList: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
.triple {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  .item {
    flex-basis: 33.33%;
    padding: 3px;
    box-sizing: border-box;
    position: relative;
    .img {
      background-size: 100%;
      background-repeat: no-repeat;
      width: 100%;
      height: 0;
      padding-bottom: 130%;
      position: relative;
      .content {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .item-title {
      text-align: center;
      font-size: 14px;
      line-height: 16px;
      height: 32px;
      padding: 0 5px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      word-wrap: break-word;
    }
    .item-subtitle {
      position: absolute;
      top: 3px;
      left: 3px;
      right: 3px;
      line-height: 16px;
      height: 32px;
      padding: 0 5px;
      background: #999;
      text-align: center;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      word-wrap: break-word;
      font-size: 12px;
      opacity: 0.7;
    }
  }
}
.showList {
  padding: 3px 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  .item {
    flex-basis: 100%;
    padding: 0 70% 0 0;
    position: relative;
    background: #eee;
    margin-top: 5px;
    .img {
      background-size: 100%;
      background-repeat: no-repeat;
      width: 100%;
      height: 0;
      padding-bottom: 130%;
      position: relative;
      .content {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .item-title {
      position: absolute;
      top: 15px;
      left: 30%;
      right: 3px;
      line-height: 16px;
      height: 32px;
      padding: 0 5px;
      text-align: right;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      word-wrap: break-word;
      font-size: 12px;
      opacity: 0.7;
    }
    .item-subtitle {
      position: absolute;
      bottom: 15px;
      left: 30%;
      right: 3px;
      line-height: 16px;
      height: 32px;
      padding: 0 5px;
      text-align: right;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      word-wrap: break-word;
      font-size: 12px;
      opacity: 0.7;
    }
  }
}
</style>
