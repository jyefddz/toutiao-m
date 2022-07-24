<template>
  <div>
    <van-nav-bar
      :title="
        comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无回复'
      "
    >
      <template #left>
        <van-icon name="cross" @click="$emit('closeRepCom')" />
      </template>
    </van-nav-bar>
    <!-- 层主 -->
    <div class="repRepCommentList_">
      <CommentItem :comment="comment"></CommentItem>
      <!-- 给层主回复的列表 -->
      <van-cell title="全部回复"></van-cell>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error="error"
        error-text="加载失败,请重试~"
        @load="onLoad"
      >
        <CommentItem
          v-for="(item, index) in commentRepListInfo"
          :key="index"
          :comment="item"
        />
      </van-list>
    </div>
    <!-- 发布评论 -->
    <div class="repRepComment">
      <van-button
        round
        size="small"
        @click="isPopShow = true"
        class="repRepComment-btn"
        >写评论</van-button
      >
    </div>
    <!-- 弹层 -->
    <van-popup v-model="isPopShow" position="bottom">
      <CommentPop
        :target="comment.com_id"
        :articleId="articleId"
        @postSuccess="onPostSuccess"
      ></CommentPop>
    </van-popup>
  </div>
</template>

<script>
import CommentItem from './CommentItem.vue'
import CommentPop from './CommentPop.vue'
import { getAllCommentList, addCommentLike, delCommentLike } from '@/api'
import dayjs from '@/utils/dayjs'
export default {
  components: {
    CommentItem,
    CommentPop
  },
  props: {
    comment: {
      type: Object,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      commentRepListInfo: [],
      loading: false,
      finished: false,
      error: false,
      offset: null,
      limit: 10,
      commentLoading: false,
      isPopShow: false
    }
  },
  computed: {
    commentTime() {
      const commentTime = dayjs(this.commentRepListInfo.pubdate).fromNow()
      return commentTime
    }
  },
  methods: {
    async onLoad() {
      try {
        const { data } = await getAllCommentList({
          type: 'c',
          source: this.comment.com_id,
          offset: this.offset,
          limit: this.limit
        })
        console.log(data)
        const { results } = data.data
        this.commentRepListInfo.push(...results)
        this.loading = false
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    },
    async onCommentLike() {
      this.commentLoading = true
      try {
        if (this.commentRepListInfo.is_liking) {
          await delCommentLike(this.commentRepListInfo.com_id)
          this.commentRepListInfo.like_count--
        } else {
          await addCommentLike(this.commentRepListInfo.com_id)
          this.commentRepListInfo.like_count++
        }
        this.commentRepListInfo.is_liking = !this.commentRepListInfo.is_liking
      } catch (error) {
        this.$toast('操作失败')
        console.log(this.commentRepListInfo.is_liking)
      }
      this.commentLoading = false
    },
    onPostSuccess(data) {
      this.comment.reply_count++
      this.isPopShow = false
      this.commentRepListInfo.unshift(data.new_obj)
    }
  }
}
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }
  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    width: 135px;
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
  }
  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;
    .van-icon {
      font-size: 30px;
    }
    &.isLiked {
      color: #ed6a55;
    }
  }
}
.repRepCommentList_ {
  position: fixed;
  top: 200px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}
.repRepComment {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .repRepComment-btn {
    width: 60%;
  }
}
</style>
