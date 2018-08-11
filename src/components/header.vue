<template>
  <div class="header">
    <van-search @focus="onFocus" style="z-index:200;" v-model="value" show-action>
      <div slot="action">搜索</div>
    </van-search>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: ""
    };
  },
  methods: {
    onFocus() {
      this.$router.push({ path: "/search" });
    }
  },
  watch: {},
  components: {}
};
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  max-width: 600px;
  margin: 0 auto;
  height: 50px;
}
</style>

<style lang="scss">
.header {
  .van-search__action {
    padding: 5px;
  }
  .van-search--show-action {
    padding-right: 5px;
  }
}
</style>