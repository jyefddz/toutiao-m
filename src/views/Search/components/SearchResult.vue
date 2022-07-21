<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item, index) in searchResultInfo" :key="index">
        <template #title>
          <span>{{ item.title }}</span>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      searchResultInfo: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 10
    }
  },
  created() {},
  methods: {
    async onLoad() {
      try {
        const { data } = await getSearchResult({
          page: this.page,
          per_page: this.perPage,
          q: this.keywords
        })
        const { results } = data.data
        this.searchResultInfo.push(...results)
        this.loading = false
        if (results.length !== 0) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (error) {
        this.$toast('数据加载失败')
      }
    }
  }
}
</script>

<style></style>
