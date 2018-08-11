<template>
  <div class="category mt-56">

    <div class="category-tabList">

      <div class="category-tabs">
        <button v-for="(tab,i) in tabs" @click="currentIndex=i" :class="currentIndex===i?'current':''" :key="i">
          <span>
            {{tab}}
          </span>
        </button>
      </div>
      <div class="category-list scrollable only-y">
        <h3 class="txt-center fs-20  mt-10 mb-10">{{tabs[currentIndex]}}</h3>
        <van-list :immediate-check="false" v-model="loading" @load="onLoad" :finished="finished">
          <reslist :itemList="list" />
        </van-list>
      </div>
    </div>
  </div>

</template>

<script>
import { getList, getDetail } from "@/api/api";
import reslist from "./reslist";
export default {
  components: {
    reslist
  },
  mounted() {
    this._getList();
  },
  data() {
    return {
      tabs: ["电影", "电视剧", "综艺", "动漫"],
      currentIndex: 0,
      list: [],
      page: 0,
      loading: false,
      finished: false,
      keyword: ""
    };
  },
  methods: {
    onLoad() {
      setTimeout(() => {
        this.page++;
        this._getList(this.page);
      }, 500);
    },
    _getList(pg) {
      let type;
      switch (this.currentIndex) {
        case 0:
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
        case 1:
          type = ["国产剧", "港台剧", "欧美剧", "日韩剧"];
          break;
        case 2:
          type = ["综艺"];
          break;
        case 3:
          type = ["动漫"];
          break;
      }
      let page = pg || 0;
      getList({ type }, page).then(res => {
        if (pg) {
          this.list = this.list.concat(...res);
          if (!res.length) {
            this.finished = true;
          }
          this.loading = false;
        } else {
          this.list = res;
        }
      });
    }
  },
  watch: {
    currentIndex(newVal) {
      this._getList();
      this.page = 0;
    }
  }
};
</script>

<style lang="scss" scoped>
.category {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.category-tabList {
  flex: 1;
  display: flex;
  .category-tabs {
    flex-basis: 30%;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #bbb;
    button {
      border: none;
      background: none;
      line-height: 30px;
      height: 60px;
      border-bottom: 1px solid #bbb;
      &:nth-last-child(1) {
        border-bottom: none;
      }
      span {
        text-align: center;
        padding: 0 5px;
        word-break: break-all;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
    }
    .current {
      background: #f44;
      color: #fff;
    }
  }
  .category-list {
    flex: 1;
  }
}
</style>