<template>
  <div style="flex:1;" class="mt-56">
    <div class="scrollable only-y">
      <van-cell @click="toList('movie')" title="电影" is-link value="更多" />
      <reslist :itemList="movieList" />

      <van-cell @click="toList('tv')" class="mt-10" title="电视剧" is-link value="更多" />
      <reslist :itemList="tvList" />

      <van-cell @click="toList('variety')" class="mt-10" title="综艺" is-link value="更多" />
      <reslist :itemList="varietyList" />

      <van-cell @click="toList('animation')" class="mt-10" title="动漫" is-link value="更多" />
      <reslist :itemList="animationList" />
      <div class="mb-50">

      </div>
    </div>

  </div>
</template>

<script>
import { getList, getDetail } from "@/api/api";
import reslist from "@/components/resList";
export default {
  components: {
    reslist
  },
  data() {
    return {
      movieList: [],
      tvList: [],
      varietyList: [],
      animationList: []
    };
  },
  mounted() {
    this.getMovie();
    this.getTv();
    this.getVariety();
    this.getAnimation();
  },
  methods: {
    getMovie() {
      let type = [
        "剧情片",
        "动作片",
        "喜剧片",
        "爱情片",
        "科幻片",
        "恐怖片",
        "战争片"
      ];
      getList({ type }, 0).then(res => {
        this.movieList = res;
      });
    },
    getTv() {
      let type = ["国产剧", "港台剧", "欧美剧", "日韩剧"];
      getList({ type }, 0).then(res => {
        this.tvList = res;
      });
    },
    getVariety() {
      let type = ["综艺"];
      getList({ type }, 0).then(res => {
        this.varietyList = res;
      });
    },
    getAnimation() {
      let type = ["动漫"];
      getList({ type }, 0).then(res => {
        this.animationList = res;
      });
    }
  }
};
</script>

