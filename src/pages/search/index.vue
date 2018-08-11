<template>
  <transition name="transcitys">
    <div class="search">
      <div class="search-header">
        <van-row>
          <van-col span="2">
            <van-icon @click="goBack" class="mid" name="arrow-left" />

          </van-col>
          <van-col span="22">
            <van-search :autofocus="true" @search="onSearch" ref="search" style="z-index:200;" v-model="keyWord" show-action>
              <div @click="onSearch" slot="action">搜索</div>
            </van-search>
          </van-col>

        </van-row>
      </div>
      <div class="nav ">
        <span @click="toggleTab(0)" :class="{'active':tab===0}">{{types[currentTypeIndex]}}</span>
        <span @click="toggleTab(1)" :class="{'active':tab===1}">
          <span>更新日期(待开发)</span>
          <span class="tri">
            <div v-show="tab===1" class="up" :class="{'triup':timeSort}" />
            <div v-show="tab===1" class="down" :class="{'tridown':!timeSort}" />
          </span>

        </span>
        <span @click="showList=!showList" class="con" style="color:#999;">
          <i class="iconfont" :class="!showList?'icon-viewgallery':'icon-viewlist'"></i>
        </span>
      </div>
      <div class="mt-100 mb-50">
        <van-list :immediate-check="false" v-model="loading" @load="onLoad" :finished="finished">
          <reslist :itemList="itemList" :showList="showList" />
        </van-list>
      </div>
      <transition :name="onSearchSel?'transleft':'transright'">
        <search-sel @onSel="onSel" v-show="onSearchSel"></search-sel>
      </transition>

      <van-popup position="bottom" v-model="showType">

        <van-cell @click="setCurrentTypeIndex(i)" v-for="(type,i) in types" :key="i" :title="type">
          <template slot="title">
            <div :style="{color: currentTypeIndex===i?'red':'#333'}">
              <span>{{type}}</span>
            </div>
          </template>
        </van-cell>

      </van-popup>

    </div>
  </transition>

</template>

<script>
import searchSel from "./searchSel";
import reslist from "@/components/resList";
import { getList, getDetail } from "@/api/api";

export default {
  mounted() {
    this.$refs.search.$el.focus();
  },
  components: {
    searchSel,
    reslist
  },
  data() {
    return {
      tab: 0,
      timeSort: false,

      keyWord: "",
      onSearchSel: true,
      itemList: [],
      page: 0,
      loading: false,
      finished: false,
      showList: false,
      showType: false,
      types: ["全部", "电影", "电视剧", "综艺", "动漫"],
      currentTypeIndex: 0
    };
  },
  methods: {
    setCurrentTypeIndex(index) {
      this.currentTypeIndex = index;
      this.showType = false;
    },
    toggleTab(id) {
      this.tab = id;
      if (id === 1) {
        this.timeSort = !this.timeSort;
      } else if (id === 0) {
        this.showType = true;
      }
    },
    onLoad() {
      setTimeout(() => {
        this.page++;
        this._getList();
      }, 500);
    },
    _getList() {
      let type;
      getList({ name: this.keyWord }, this.page).then(res => {
        this.onSearchSel = false;
        this.itemList = this.itemList.concat(...res);
        if (!res.length) {
          this.finished = true;
        }
        this.loading = false;
      });
    },
    onSearch() {
      this._getList();
    },
    onFocus() {
      this.$router.push({ path: "/search" });
    },
    onSel(tag) {
      this.keyWord = tag;
      this.onSearch();
    }
  },
  watch: {}
};
</script>

<style lang="scss" scoped>
@import "../../css/font/iconfont.css";
.search {
  flex: 1;
}
.search-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  max-width: 600px;
  margin: 0 auto;
  height: 50px;
  background: rgb(242, 242, 242);
}
.mid {
  // text-align: center;
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: center; /*实现水平居中*/
  align-items: center; /*实现垂直居中*/
}
.nav {
  position: fixed;
  top: 50px;
  left: 0;
  right: 0;
  z-index: 600;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-wrap: nowrap;
  background: #fff;
  border-bottom: 2px solid #eee;
  box-sizing: border-box;
  span {
    flex: 1;
    line-height: 40px;
    text-align: center;
    .tri {
      position: relative;

      .up {
        position: absolute;
        left: 4px;
        top: 2px;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 3.5px 7px 3.5px;
        border-color: transparent transparent #aaa transparent;
      }
      .down {
        position: absolute;
        left: 4px;
        top: 14px;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 7px 3.5px 0 3.5px;
        border-color: #aaa transparent transparent transparent;
      }
      .triup {
        border-color: transparent transparent red transparent;
      }
      .tridown {
        border-color: red transparent transparent transparent;
      }
    }
  }
  .con {
    flex-grow: 0;
    flex-basis: 50px;
  }
  .active {
    // border-bottom: 1px solid red;
    color: red;
  }
}
</style>

<style lang="scss">
.search-header {
  .van-search {
    padding: 3px 15px;
  }
  .van-search__action {
    padding: 5px;
  }
  .van-search--show-action {
    padding-right: 5px;
    padding-left: 0;
  }
  .van-icon-search {
    left: 15px;
  }
}
</style>