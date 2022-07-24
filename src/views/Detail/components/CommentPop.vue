<template>
  <div class="popComment">
    <van-field
      class="pop-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      class="pop-btn"
      @click="onPostComment"
      :disabled="!message.length"
      >发布</van-button
    >
  </div>
</template>

<script>
import { postComment } from '@/api'
export default {
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      default: null
    }
  },
  data() {
    return {
      message: ''
    }
  },
  methods: {
    async onPostComment() {
      this.$toast.loading({
        message: '加载中..',
        // loading时,点击页面没有反应
        forbidClick: true
      })
      try {
        const { data } = await postComment({
          target: this.target.toString(),
          content: this.message,
          art_id: this.articleId ? this.articleId.toString() : this.articleId
        })
        this.message = ''
        this.$emit('postSuccess', data.data)
        this.$toast.success('发布评论成功')
      } catch (error) {
        this.$toast.fail('发布评论失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.popComment {
  display: flex;
  padding: 15px;
  align-items: center;
  .pop-field {
    background: #f5f7f9;
    margin-right: 15px;
  }
  .pop-btn {
    display: flex;
    color: #6ba3d8;
    border: 1px solid #fff;
    font-size: 28px;
    align-items: center;
    justify-content: center;
    height: 100%;
    white-space: nowrap;
  }
}
</style>
