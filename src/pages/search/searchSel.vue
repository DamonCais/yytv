<template>
  <div class="searchSel">
    <h6>热门搜索</h6>
    <span @click="onSel(tag)" class="tag" v-for="(tag,i) in tags" :key="i"> {{tag}}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tags: ["基本演绎法", "延禧攻略", "棒球", "英雄"]
    };
  },
  methods: {
    onSel(tag) {
      this.$emit("onSel", tag);
    }
  }
};
</script>

<style lang="scss" scoped>
.searchSel {
  position: fixed;
  top: 50px;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 666;
  background: #fff;
  max-width: 600px;
  margin: 0 auto;
  padding: 10px 20px;
  color: #aaa;
  font-size: 12px;
  box-sizing: border-box;
  h6 {
    margin-bottom: 10px;
  }
  .tag {
    display: inline-block;
    padding: 3px 6px;
    background: aquamarine;
    border-radius: 3px;
    margin: 10px 16px 0 0;
    color: #666;
  }
}
</style>