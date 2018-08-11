<template>
  <div class="mt-50 mb-50">
    <div class="nav-header">
      <van-nav-bar style="max-width:600px; margin:0 auto;" :title="$route.params.type" left-text="返回" left-arrow @click-left="goBack" />
    </div>
    <van-list :immediate-check="false" v-model="loading" @load="onLoad" :finished="finished">
      <reslist :itemList="itemList" />
    </van-list>
  </div>
</template>

<script>
import reslist from "@/components/resList";
import { getList, getDetail } from "@/api/api";

export default {
  components: {
    reslist
  },
  mounted() {
    this._getList();
  },
  data() {
    return {
      itemList: [],
      page: 0,
      loading: false,
      finished: false
    };
  },
  methods: {
    onLoad() {
      setTimeout(() => {
        this.page++;
        this._getList();
      }, 500);
    },
    _getList() {
      let type;
      switch (this.$route.params.type) {
        case "movie":
          type = [
            "剧情片",
            "动作片",
            "喜剧片",
            "爱情片",
            "科幻片",
            "恐怖片",
            "战争片"
          ];
          break;
        case "tv":
          type = ["国产剧", "港台剧", "欧美剧", "日韩剧"];
          break;
        case "variety":
          type = ["综艺"];
          break;
        case "animation":
          type = ["动漫"];
          break;
      }
      getList({ type }, this.page).then(res => {
        this.itemList = this.itemList.concat(...res);
        if (!res.length) {
          this.finished = true;
        }
        this.loading = false;
      });
    }
  }
};
</script>

<style>
</style>
