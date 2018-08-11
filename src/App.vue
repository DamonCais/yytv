<template>
  <div id="app">
    <search-header v-if="!$route.meta.noSearch" />
    <router-view></router-view>
    <foot/>
  </div>
</template>

<script>
import searchHeader from "@/components/header";
import foot from "@/components/footer";
export default {
  name: "app",
  components: {
    foot,
    searchHeader
  }
};
</script>

<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100%;
  display: flex;
}
</style>
