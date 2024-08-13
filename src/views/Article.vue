<template>

    <div class="article-page">
      <nav class="my-nav van-hairline--bottom">
        <a
          href="javascript:;"
          @click="changeStatus('weight_desc')"
          :class="{ active: sorter === 'weight_desc' }"
          >推荐</a
        >
        <a
          href="javascript:;"
          @click="changeStatus(null)"
          :class="{ active: sorter === null }"
          >最新</a
        >
        <div class="logo"><img src="@/assets/logo.png" alt="" /></div>
      </nav>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <article-item
          v-for="(item, index) in list"
          :key="index"
          :item="item"
          keep-alive
        ></article-item>
      </van-list>
    </div>

</template>

<script>
import { getArticle } from '@/api/article'
import ArticleItem from '@/components/ArticleItem.vue'
export default {
  components: { ArticleItem },
  name: 'ArticlePage',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      sorter: 'weight_desc',
      current: 1
    }
  },

  methods: {
    async onLoad () {
      const res = await getArticle({
        current: this.current, // 当前页数
        pageSize: 10, // 每页条数
        sorter: 'weight_desc' // 默认推荐数据
      })
      this.list.push(...res.data.rows)
      this.loading = false
      this.current++
      if (this.current > res.data.pageTotal) {
        this.finished = true
      }
    },
    changeStatus (sorter) {
      this.sorter = sorter
      this.list = []
      this.current = 1
      this.loading = true
      this.finished = false
      this.onLoad()
    }
  },
  created () {}
}
</script>

<style lang="less" scoped>
.article-page {
  margin-bottom: 50px;
  margin-top: 44px;
  .my-nav {
    height: 44px;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 999;
    background: #fff;
    display: flex;
    align-items: center;
    > a {
      color: #999;
      font-size: 14px;
      line-height: 44px;
      margin-left: 20px;
      position: relative;
      transition: all 0.3s;
      &::after {
        content: "";
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
        width: 0;
        height: 2px;
        background: #222;
        transition: all 0.3s;
      }
      &.active {
        color: #222;
        &::after {
          width: 14px;
        }
      }
    }
    .logo {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      > img {
        width: 64px;
        height: 28px;
        display: block;
        margin-right: 10px;
      }
    }
  }
}
.article-item {
  .head {
    display: flex;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
    }
    .con {
      flex: 1;
      overflow: hidden;
      padding-left: 10px;
      p {
        margin: 0;
        line-height: 1.5;
        &.title {
          width: 280px;
        }
        &.other {
          font-size: 10px;
          color: #999;
        }
      }
    }
  }
  .body {
    font-size: 14px;
    color: #666;
    line-height: 1.6;
    margin-top: 10px;
  }
  .foot {
    font-size: 12px;
    color: #999;
    margin-top: 10px;
  }
}
</style>
