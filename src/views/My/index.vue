<template>
  <div class="my">
    <!-- 头部 -->
    <header>
      <!-- 登录 -->
      <div v-if="isLogin" class="user-info banner">
        <!-- 占位 -->
        <van-row></van-row>
        <!-- 展示用户信息 -->
        <van-row class="row-2">
          <van-col span="12">
            <van-row type="flex" align="center" justify="space-around">
              <!-- 头像 -->
              <van-image
                round
                width="1.76rem"
                height="1.76rem"
                :src="userInfo.photo"
              />
              <!-- 手机号 -->
              <span class="mobile">{{ userInfo.name }}</span>
            </van-row>
          </van-col>
          <van-col span="11">
            <van-row class="code-row" type="flex" align="center" justify="end">
              <van-button class="code-btn" size="mini" round to="/user/profile"
                >编辑资料</van-button
              >
            </van-row>
          </van-col>
        </van-row>
        <!-- 用户文章的数量 -->
        <van-row
          ><van-grid class="grid" :border="false">
            <van-grid-item text="头条">
              <template #icon>
                <span class="userNumber">{{ userInfo.art_count }}</span>
              </template>
            </van-grid-item>
            <van-grid-item text="粉丝">
              <template #icon>
                <span class="userNumber">{{ userInfo.fans_count }}</span>
              </template>
            </van-grid-item>
            <van-grid-item text="关注">
              <template #icon>
                <span class="userNumber">{{
                  userInfo.follow_count
                }}</span></template
              >
            </van-grid-item>
            <van-grid-item text="获赞">
              <template #icon>
                <span class="userNumber">{{
                  userInfo.like_count
                }}</span></template
              >
            </van-grid-item>
          </van-grid></van-row
        >
      </div>
      <!-- 未登录 -->
      <div v-else class="login-register banner">
        <div class="wrap" @click="goLogin">
          <img src="../../assets/images/mobile.png" />
          <span class="logOrReg">登录 / 注册</span>
        </div>
      </div>
    </header>

    <!-- 主体 -->
    <main>
      <!-- 历史和搜索 -->
      <div>
        <van-grid column-num="2" class="grid" clickable>
          <van-grid-item text="收藏">
            <template #icon>
              <span class="toutiao toutiao-shoucang"></span>
            </template>
          </van-grid-item>
          <van-grid-item text="历史">
            <template #icon>
              <span class="toutiao toutiao-lishi"></span>
            </template>
          </van-grid-item>
        </van-grid>
      </div>
      <!-- 消息通知/小智同学 -->
      <div class="link">
        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学" is-link />
      </div>
    </main>

    <!-- 底部退出按钮 -->
    <van-button v-if="isLogin" block class="login-btn" @click="logOut"
      >退出</van-button
    >
  </div>
</template>

<script>
// 引入api
import { getUserInfo } from '@/api'
export default {
  data() {
    return {
      // 用户信息
      userInfo: {}
    }
  },
  computed: {
    // 标识是否登录
    isLogin() {
      //  !!转成布尔值
      return !!this.$store.state.user.token
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    // 退出登录
    logOut() {
      this.$dialog
        .confirm({
          title: '黑马头条',
          message: '是否确认退出该账号'
        })
        .then(() => {
          // 点击确认
          this.$store.commit('setUser', {})
        })
        .catch(() => {})
    },
    // 前往login页面
    goLogin() {
      this.$router.push('/login')
    },
    // 获取用户信息,并处理数据
    async getUserInfo() {
      if (this.isLogin) {
        // 如果用户登录,拿到用户信息
        try {
          const {
            data: { data }
          } = await getUserInfo()
          this.userInfo = data
        } catch (err) {
          this.$toast.fail('请重新登录')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.my {
  background-color: #f5f7f9;
  height: calc(100vh - 100px);
}
.banner {
  height: 400px;
  width: 100%;
  background: url('../../assets/images/banner.png') no-repeat 0 0 / cover;
}
// 用户信息样式
.user-info {
  display: flex;
  flex-direction: column;
  > .van-row {
    flex: 1;
  }
  .row-2 {
    .van-col {
      height: 100%;
    }
  }
  .mobile {
    font-size: 0.4rem;
    color: #fff;
    margin-left: 0.29333rem;
  }
  .code-btn {
    width: 1.53333rem;
    height: 0.42667rem;
    background: #fff;
    border-radius: 0.21333rem;
    font-size: 0.26667rem;
    color: #666;
    padding: 0;
  }
  .code-row {
    height: 100%;
  }
  .grid {
    :deep(.van-grid-item__content) {
      background-color: unset;
    }
  }
  .van-grid-item {
    color: #fff;
    :deep(.van-grid-item__text) {
      color: #fff;
    }
  }
  .userNumber {
    font-size: 0.34667rem;
  }
}

// 主体区域
main {
  .grid {
    color: #646566;
    // 字体图标
    .toutiao {
      font-size: 0.6rem;

      &.toutiao-lishi {
        color: #ffb31d;
      }
      &.toutiao-shoucang {
        color: #ed5253;
      }
    }
  }
  .link {
    margin: 0.13333rem 0;
  }
}

.login-btn {
  box-sizing: border-box;
  width: 100%;
  padding: 0.26667rem 0.42667rem;
  :deep(.van-button__text) {
    color: red;
    font-size: 0.37333rem;
    line-height: 0.64rem;
  }
}
.login-register {
  display: flex;
  align-items: center;
  justify-content: center;
  .wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    img {
      margin-bottom: 10px;
      width: 1.76rem;
    }
    .logOrReg {
      font-size: 0.37333rem;
    }
  }
}
</style>
