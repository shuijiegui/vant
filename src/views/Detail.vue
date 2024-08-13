<template>
  <div class="detail-page">
    <van-nav-bar
      left-text="返回"
      @click-left="$router.back()"
      fixed
      title="面经详情"
    />
    <header class="header">
      <h1>{{item.stem}}</h1>
      <p>{{item.createdAt}} | {{item.views}} 浏览量 | {{item.likeCount}} 点赞数 </p>
      <p><img :src="item.avatar" alt="" /><span>{{item.creator}}</span> </p>
    </header>
    <main class="body" v-html="item.content">

    </main>
    <div class="opt">
     <van-icon @click="toggleLike" :class="{active:item.likeFlag}" name="like-o"/>
      <van-icon @click="toggleCollect" :class="{active:item.collectFlag}" name="star-o"/>

    </div>

  </div>
</template>

<script>
import { getArticleDetail, updateLike, updateCollect } from '@/api/article'
export default {
  name: 'DetailIdex',
  data () {
    return {
      item: {}
    }
  },
  methods: {
    async toggleLike () {
      await updateLike(this.item.id)
      this.item.likeFlag = !this.item.likeFlag
      if (this.item.likeFlag) {
        this.item.likeCount++
        this.$toast.success('点赞成功')
      } else {
        this.item.likeCount--
        this.$toast.success('取消点赞')
      }
    },
    async toggleCollect () {
      await updateCollect(this.item.id)
      this.item.collectFlag = !this.item.collectFlag
      if (this.item.collectFlag) {
        this.$toast.success('收藏成功')
      } else {
        this.$toast.success('取消收藏')
      }
    }

  },
  async created () {
    const res = await getArticleDetail(this.$route.params.id)
    this.item = res.data
  }
}
</script>

<style lang="less" scoped>
.detail-page {
  margin-top: 44px;
  overflow: hidden;
  padding: 0 15px;
  .header {
    h1 {
      font-size: 24px;
    }
    p {
      color: #999;
      font-size: 12px;
      display: flex;
      align-items: center;
    }
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
    }
  }
  .opt {
    position: fixed;
    bottom: 100px;
    right: 0;
    > .van-icon {
      margin-right: 20px;
      background: #fff;
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-radius: 50%;
      box-shadow: 2px 2px 10px #ccc;
      font-size: 18px;
      &.active {
        background: #FEC635;
        color: #fff;
      }
    }
  }
}
</style>
