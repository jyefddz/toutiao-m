<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar
      class="detailNavbar"
      title="黑马头条"
      left-arrow
      @click-left="backTopPage"
    />

    <div class="main-wrap">
      <!-- 加载完成-文章详情 -->
      <div class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ articleDetailInfo.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="articleDetailInfo.aut_photo"
          />
          <div slot="title" class="user-name">
            {{ articleDetailInfo.aut_name }}
          </div>
          <div slot="label" class="publish-date">
            {{ articleDetailTime }}
          </div>
          <van-button
            @click="onFocus"
            class="follow-btn"
            round
            size="small"
            v-if="articleDetailInfo.is_followed"
            >已关注</van-button
          >
          <van-button
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            @click="onFocus"
            v-else
            >关注</van-button
          >
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="articleDetailInfo.content"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- 文章评论 -->
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :error="error"
          error-text="加载失败,请重试~"
          @load="onLoad"
        >
          <CommentItem
            v-for="(item, index) in commentListInfo"
            :key="index"
            :comment="item"
            @repCommentClick="onRepCommentClick"
          />
        </van-list>
      </div>
      <!-- /加载完成-文章详情 -->
      <!-- 底部区域 -->
      <div class="article-bottom">
        <van-button
          class="comment-btn"
          type="default"
          round
          size="small"
          @click="isPopShow = true"
          >写评论</van-button
        >
        <van-icon
          name="comment-o"
          :badge="articleDetailInfo.comm_count"
          color="#777"
        />
        <van-icon
          color="#ed6a55"
          name="star"
          v-if="articleDetailInfo.is_collected"
          @click="onCollect"
        />
        <van-icon color="#777" name="star-o" v-else @click="onCollect" />
        <van-icon
          color="#ed6a55"
          name="good-job"
          v-if="articleDetailInfo.attitude === 1"
          @click="onLiking"
        />
        <van-icon color="#777" name="good-job-o" v-else @click="onLiking" />
        <van-icon
          name="share"
          color="#777777"
          @click="showShare = !showShare"
        ></van-icon>
        <van-share-sheet
          v-model="showShare"
          title="立即分享给好友"
          :options="options"
        />
      </div>
      <!-- /底部区域 -->

      <!-- 发布评论 -->
      <van-popup v-model="isPopShow" position="bottom">
        <CommentPop
          :target="articleDetailInfo.art_id"
          @postSuccess="onPostSuccess"
        ></CommentPop>
      </van-popup>
    </div>
    <!-- 发布评论回复 -->
    <van-popup v-model="isRepPopShow" position="bottom" style="height: 93%">
      <CommentRepItem
        v-if="isRepPopShow"
        :comment="commentRepRepInfo"
        @closeRepCom="isRepPopShow = false"
        :articleId="id"
      ></CommentRepItem>
    </van-popup>
  </div>
</template>

<script>
import {
  getArticleDetail,
  addFocus,
  delFocus,
  addCollect,
  delCollect,
  addLiking,
  delLiking,
  getAllCommentList
} from '@/api'
import dayjs from '@/utils/dayjs'
import CommentItem from './components/CommentItem.vue'
import CommentPop from './components/CommentPop.vue'
import CommentRepItem from './components/CommentRepItem.vue'
export default {
  components: {
    CommentItem,
    CommentPop,
    CommentRepItem
  },
  data() {
    return {
      articleDetailInfo: [],
      commentListInfo: [],
      loading: false,
      finished: false,
      error: false,
      offset: null,
      limit: 10,
      isPopShow: false,
      isRepPopShow: false,
      commentRepRepInfo: {},
      showShare: false,
      id: this.$route.query.id,
      options: [
        [
          { name: '微信', icon: 'wechat' },
          { name: '朋友圈', icon: 'wechat-moments' },
          { name: '微博', icon: 'weibo' },
          { name: 'QQ', icon: 'qq' }
        ],
        [
          { name: '复制链接', icon: 'link' },
          { name: '分享海报', icon: 'poster' },
          { name: '二维码', icon: 'qrcode' },
          { name: '小程序码', icon: 'weapp-qrcode' }
        ]
      ]
    }
  },
  methods: {
    // 返回上一页
    backTopPage() {
      this.$router.go(-1)
    },
    async getArticleDetail() {
      this.id = this.$route.query.id
      const res = await getArticleDetail(this.$route.query.id)
      this.articleDetailInfo = res.data.data
    },
    async onFocus() {
      try {
        // 已关注,点击取消关注
        if (this.articleDetailInfo.is_followed) {
          await delFocus(this.articleDetailInfo.aut_id)
          this.articleDetailInfo.is_followed = false
        } else {
          // 未关注,添加关注
          await addFocus(this.articleDetailInfo.aut_id)
          this.articleDetailInfo.is_followed = true
          this.$toast('关注成功')
        }
      } catch (err) {
        this.$toast('操作失败,请重试!')
      }
    },
    async onCollect() {
      try {
        // 已收藏,点击取消收藏
        if (this.articleDetailInfo.is_collected) {
          await delCollect(this.articleDetailInfo.art_id)
          this.articleDetailInfo.is_collected = false
        } else {
          // 未收藏,添加收藏
          await addCollect(this.articleDetailInfo.art_id)
          this.articleDetailInfo.is_collected = true
          this.$toast('收藏成功')
        }
      } catch (err) {
        this.$toast('操作失败,请重试!')
      }
    },
    async onLiking() {
      try {
        if (this.articleDetailInfo.attitude === 1) {
          await delLiking(this.articleDetailInfo.art_id)
          this.articleDetailInfo.attitude = -1
        } else {
          await addLiking(this.articleDetailInfo.art_id)
          this.articleDetailInfo.attitude = 1
          this.$toast('已点赞')
        }
      } catch (err) {
        this.$toast('操作失败,请重试!')
      }
    },
    async onLoad() {
      try {
        const { data } = await getAllCommentList({
          type: 'a',
          source: this.$route.query.id,
          offset: this.offset,
          limit: this.limit
        })
        // console.log(data)
        const { results } = data.data
        this.commentListInfo.push(...results)
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
    onPostSuccess(data) {
      this.articleDetailInfo.comm_count++
      this.isPopShow = false
      this.commentListInfo.unshift(data.new_obj)
    },
    onRepCommentClick(comment) {
      this.isRepPopShow = true
      this.commentRepRepInfo = comment
    }
  },
  created() {
    this.getArticleDetail()
  },
  computed: {
    articleDetailTime() {
      const detailTime = dayjs(this.articleDetailInfo.pubdate).fromNow()
      return detailTime
    }
  }
}
</script>

<style scoped lang="less">
@import './github-markdown-css.css';
.detailNavbar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  :deep(.van-icon-arrow-left) {
    color: #fff;
  }
}
.main-wrap {
  position: fixed;
  left: 0;
  right: 0;
  top: 92px;
  bottom: 88px;
  overflow-y: scroll;
  background-color: #fff;
}
.article-detail {
  .article-title {
    font-size: 40px;
    padding: 50px 32px;
    margin: 0;
    color: #3a3a3a;
  }

  .user-info {
    padding: 0 32px;
    .avatar {
      width: 70px;
      height: 70px;
      margin-right: 17px;
    }
    .van-cell__label {
      margin-top: 0;
    }
    .user-name {
      font-size: 24px;
      color: #3a3a3a;
    }
    .publish-date {
      font-size: 23px;
      color: #b7b7b7;
    }
    .follow-btn {
      width: 170px;
      height: 58px;
    }
  }

  .article-content {
    padding: 55px 32px;
    /deep/ p {
      text-align: justify;
    }
  }
}

.article-bottom {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  height: 88px;
  border-top: 1px solid #d8d8d8;
  background-color: #fff;
  .comment-btn {
    width: 282px;
    height: 46px;
    border: 2px solid #eeeeee;
    font-size: 30px;
    line-height: 46px;
    color: #a7a7a7;
  }
  .van-icon {
    font-size: 40px;
    .van-info {
      font-size: 16px;
      background-color: #e22829;
    }
  }
}
</style>
