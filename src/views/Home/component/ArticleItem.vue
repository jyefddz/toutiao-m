<template>
  <div>
    <!-- 渲染无图片 -->
    <van-cell
      @click="seeDetail(articleInfo.art_id)"
      v-if="articleInfo.cover.type === 0"
      :title="articleInfo.title"
      :label="articleDesc"
    />
    <!-- 渲染一张图片 -->
    <van-cell
      @click="seeDetail(articleInfo.art_id)"
      v-if="articleInfo.cover.type === 1"
      :title="articleInfo.title"
      :label="articleDesc"
    >
      <van-image
        width="3rem"
        height="2rem"
        :src="articleInfo.cover.images[0]"
      />
    </van-cell>
    <!-- 渲染3张图片 -->
    <van-cell
      @click="seeDetail(articleInfo.art_id)"
      v-if="articleInfo.cover.type === 3"
      :title="articleInfo.title"
      :label="articleDesc"
    >
      <template #label>
        <!-- 图片 -->
        <div>
          <van-image
            v-for="(item, index) in articleInfo.cover.images"
            :key="index"
            width="3rem"
            height="2rem"
            :src="item"
          />
        </div>
        <!-- 文章描述 -->
        <span>{{ articleDesc }}</span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
export default {
  props: {
    articleInfo: {
      type: Object,
      require: true
    }
  },
  computed: {
    articleDesc() {
      const art = this.articleInfo
      const relativeTime = dayjs(art.pubdate).fromNow()
      return `${art.aut_name} ${art.comm_count}评论 ${relativeTime}`
    }
  },
  methods: {
    seeDetail(id) {
      // console.log(id)
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
