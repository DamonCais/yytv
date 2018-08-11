<template>
    <div class="list">
        <div @click="toDetail(item.detailId)" class="item" v-for="(item,i) in itemList" :key="i">
            <div :style="{'background-image':`url('${item.img}')`}" class="img" />
            <div class="item-title">{{item.name|titleFilter}}</div>
            <div class="item-subtitle">{{item.name|subTitleFilter}}</div>
        </div>
    </div>
</template>

<script>
export default {
  methods: {},
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
    }
  }
};
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  .item {
    flex-basis: 50%;
    padding: 3px;
    box-sizing: border-box;
    position: relative;
    .img {
      background-size: 100%;
      background-repeat: no-repeat;
      width: 100%;
      height: 0;
      padding-bottom: 120%;
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
      word-break: break-all;
    }
    .item-subtitle {
      position: absolute;
      top: 3px;
      left: 3px;
      right: 3px;
      line-height: 16px;
      height: 32px;
      padding: 0 5px;
      text-align: center;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      word-break: break-all;
      overflow: hidden;
      word-wrap: break-word;
      font-size: 12px;
      background: #999;
      opacity: 0.7;
    }
  }
}
</style>