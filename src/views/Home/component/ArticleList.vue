<template>
  <div>
    <van-pull-refresh
      v-model="refreshLoading"
      @refresh="loadNextPage"
      success-text="刷新成功"
    >
      <van-list
        @load="loadNextPage"
        :immediate-check="false"
        v-model="loading"
        :error.sync="error"
        error-text="加载失败,请重新加载~"
        :finished="isFinished"
        finished-text="没有更多了~"
      >
        <ArticleItem
          v-for="item in articles"
          :key="item.art_id"
          :articleInfo="item"
          @click="seeDetail(item.art_id)"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleList } from '@/api'
import ArticleItem from './ArticleItem.vue'
/*
load 事件:滚动条触底时触发
offset:滚动条到底部的距离
loading:控制load事件触发 loading为false, vant组件库将loading设置为true
需要自己手动设置为false
 */
export default {
  components: {
    ArticleItem
  },
  data() {
    return {
      articles: [],
      pre_timestamp: '',
      loading: false,
      isFinished: false,
      error: false,
      refreshLoading: false
    }
  },
  props: {
    // 频道id
    id: {
      type: [String, Number],
      required: true
    }
  },
  created() {
    this.getArticleList()
  },
  methods: {
    // 获取频道文件并且处理文章数据
    async getArticleList() {
      try {
        const { data } = await getArticleList(this.id, +new Date())
        this.pre_timestamp = data.data.pre_timestamp
        this.articles = data.data.results
        // console.log(data.data.results)
      } catch (err) {
        // 获取状态码
        const status = err.response.status
        if (status === 400) {
          throw new Error(err.response.data.message)
        } else {
          this.$toast.fail('获取文章列表失败,请重新刷新')
        }
      }
    },
    // 加载下一页频道数据
    async loadNextPage() {
      try {
        if (Math.random() < 0.1) {
          throw new Error('错误了')
        }
        const { data } = await getArticleList(this.id, this.pre_timestamp)
        console.log(data)
        if (!data.data.pre_timestamp) {
          this.isFinished = true
        }
        // 将第n页的数据,放在articles
        if (this.refreshLoading) {
          // 下拉刷新
          this.articles.unshift(...data.data.results)
        } else {
          this.articles.push(...data.data.results)
        }

        // 更新椰树
        this.pre_timestamp = data.data.pre_timestamp
      } catch (err) {
        this.error = true
      } finally {
        // loading 设置为false
        this.loading = false
        this.refreshLoading = false
      }
    },
    seeDetail(id) {
      console.log(id)
      localStorage.setItem('art_id', id)
      this.$router.push({
        path: '/detail',
        query: { id }
      })
    }
  }
}
</script>

<style></style>
