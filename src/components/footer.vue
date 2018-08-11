<template>
  <div class="footer">
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home" to="/home">
        首页
      </van-tabbar-item>
      <van-tabbar-item icon="exchange" to="/category">分类</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/me">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  computed: {
    active: {
      get() {
        let tab = this.$route.path.replace(/\//g, " ").split(" ")[1];
        return this.tabs.findIndex(t => t === tab);
      },
      set(index) {
        if (this.active === index) {
          return;
        }
        this.$router.push({ path: "/" + this.tabs[index] });
      }
    }
  },
  data() {
    return {
      tabs: ["home", "category", "me"]
    };
  }
};
</script>

<style lang="scss">
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  .van-tabbar--fixed {
    max-width: 600px;
    margin: 0 auto;
    position: relative;
  }
}
</style>
