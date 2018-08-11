<template>
  <div>
    <d-player :options="options" @play="play" ref="player">
    </d-player>
    <van-button @click="switchHandle">switch</van-button>
  </div>
</template>

<script>
import { getMovie } from "@/api/api";
export default {
  data() {
    return {
      options: {
        video: {
          url: "http://eth.ppzuida.com/20180803/wrnh7Zgb/index.m3u8" // type: "hls"
        },
        autoplay: false,
        contextmenu: [
          {
            text: "GitHub",
            link: "https://github.com/MoePlayer/vue-dplayer"
          }
        ]
      },
      player: null
    };
  },
  mounted() {
    this.player = this.$refs.player.dp;
  },
  methods: {
    play() {
      console.log("play callback");
    },
    switchHandle() {
      this.player.switchVideo({
        url:
          "http://youku163.zuida-bofang.com/20180803/10834_b0a36d6a/index.m3u8"
      });
    }
  },
  components: {}
};
</script>

<style>
</style>
