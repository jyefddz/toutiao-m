<template>
  <div>
    <van-cell v-for="(item, index) in highLightDate" :key="index" icon="search">
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api'
export default {
  props: {
    // 搜索关键词
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggestions: []
    }
  },
  watch: {
    // keywords() {
    //   this.getSearchSuggestion()
    // }

    // 监视属性绑定的函数,如果是methods里面的话,支持字符串的写法
    // keywords: 'getSearchSuggestion'
    keywords: {
      immediate: true,
      handler() {
        this.getSearchSuggestion()
      }
    }
  },
  methods: {
    // 获取搜索建议,并处理数据
    async getSearchSuggestion() {
      try {
        const res = await getSearchSuggestion(this.keywords)
        if (res.data.data.options.length === 0) {
          this.$toast.fail('没有搜索建议')
        }
        this.suggestions = res.data.data.options.filter(Boolean)
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {
    highLightDate() {
      // 将搜索建议的每一项处理
      const reg = new RegExp(this.keywords, 'ig')

      return this.suggestions.map((str) =>
        str?.replace(reg, (match) => `<span style="color:red">${match}</span>`)
      )
    }
  }
}
</script>

<style></style>
