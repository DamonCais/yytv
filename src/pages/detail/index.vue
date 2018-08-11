<template>
  <div style="flex:1;" class="mb-50 mt-50">
    <div style="position:fixed;top:0;left:0;right:0;">
      <van-nav-bar style="max-width:600px;margin:0 auto;" :title="detail.name" left-text="返回" left-arrow @click-left="goBack" />

    </div>
    <div class="player">
      <d-player :options="options" @play="play" ref="player">
      </d-player>
    </div>

    <van-tabs>
      <van-tab title="选集">
        <van-button size="small" v-for="(link,i) in detail.linkList" :key="i" class="m-5" :type="currentIndex===i?'danger':'default'" @click="switchLink(i)">
          {{link.split('$')[0]}}
        </van-button>

      </van-tab>
      <van-tab title="介绍">
        <div class="description" v-html="afilter(detail.info)" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getDetail } from "@/api/api";
export default {
  data() {
    return {
      options: {
        video: {
          url: "" // type: "hls"
        },
        autoplay: false
      },
      player: null,
      currentIndex: 0,
      detail: {}
    };
  },
  destroyed() {
    this.player.destroy();
  },
  mounted() {
    this.player = this.$refs.player.dp;
    this._getDetail();
  },
  methods: {
    afilter(val) {
      if (!val) return "";
      return val.replace(/<a/g, "<div").replace(/a>/g, "div>");
    },
    switchLink(index) {
      let link = this.detail.linkList[index];
      this.currentIndex = index;
      this.player.switchVideo({
        url: link.split("$")[1]
      });
    },
    _getDetail() {
      getDetail(this.$route.params.id).then(res => {
        console.log(res);
        this.detail = res;
        let link = res.linkList[0];
        this.player.switchVideo({
          url: link.split("$")[1]
        });
      });
    },
    play() {
      console.log("play callback");
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.description {
  padding: 15px;
}
</style>
