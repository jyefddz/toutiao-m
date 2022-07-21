<template>
  <div>
    <!-- 头部搜索 -->
    <form action="/">
      <van-search
        v-model="keywords"
        show-action
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @focus="visibleSearchSuggestion"
        @search="onSearch"
        @cancel="backTopPage"
        class="search"
      />
    </form>

    <!-- 搜索结果/历史/建议 -->
    <!-- <SearchHistory></SearchHistory>
    <SearchResult></SearchResult>
    <SearchSuggestion></SearchSuggestion> -->
    <component
      :is="componentName"
      :keywords="keywords"
      :searchHistories="searchHistories"
      @clearHistory="searchHistories = []"
      @search="onSearch"
    ></component>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
import SearchResult from './components/SearchResult.vue'
import { setHistoryToLocal, getHistoryByLocal } from '@/api'
export default {
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  data() {
    return {
      keywords: '',
      isShowSearchResult: false,
      searchHistories: getHistoryByLocal() || []
    }
  },
  computed: {
    componentName() {
      // 搜索结果: 搜索框没有值或者是空字符串
      // 搜索结果: isShowSearchResult = true
      if (this.keywords.trim() === '') {
        return 'SearchHistory'
      }
      if (this.isShowSearchResult) {
        return 'SearchResult'
      }
      return 'SearchSuggestion'
    }
  },
  watch: {
    searchHistories(value) {
      setHistoryToLocal(value)
    }
  },
  methods: {
    // 搜索
    onSearch(val) {
      this.keywords = val
      const index = this.searchHistories.indexOf(val)
      console.log(this.searchHistories)
      console.log(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)
      this.isShowSearchResult = true
    },
    // 返回上一页
    backTopPage() {
      this.$router.go(-1)
    },
    // 显示搜索建议
    visibleSearchSuggestion() {
      // 如果keywords 没有值 ,显示搜索中
      // 如果keywords 有值 显示搜索建议
      this.isShowSearchResult = false
    }
  }
}
</script>

<style scoped lang="less">
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
