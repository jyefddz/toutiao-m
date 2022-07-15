<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar
      title="登录"
      class="navbar"
      left-arrow
      @click-left="backTopPage"
    >
      <template #left> <van-icon name="cross" /> </template>
    </van-nav-bar>
    <!-- 手机号/验证码登录 -->
    <!-- form里的input 必须给name 用于标识 -->
    <van-form ref="form" class="form" @submit="login">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        type="text"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <!-- 左侧字体图标 -->
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>

        <!-- 右侧验证码图标 -->
        <template #right-icon>
          <!-- 验证码倒计时 -->
          <van-count-down
            v-if="isShowCountDown"
            :time="3 * 1000"
            @finish="isShowCountDown = false"
          />
          <!-- 发送验证码图标 -->
          <van-button
            v-else
            class="code-btn"
            size="mini"
            round
            @click="sendCode"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <!-- 登录按钮 -->
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit" @click="login"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
// 1.如何从vuex中拿数据
// this.$store.state.对象名
// 2. 修改数据
// vuex的数据, 必须在vuex中修改
// mutations 声明一个方法 去修改
// mutations里的方法 第一个参数是state
// 3. 怎么去调用mutations里的方法
// $store.commit('mutation里的方法名,参数)
// 引入api
import { login, sendCode } from '@/api/user'
import { mobileRules, codeRules } from './rules'
// form表单域里 在任意的button点击都可以触发submit
export default {
  data() {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      isShowCountDown: false
    }
  },
  methods: {
    // 返回来之前的页面
    backTopPage() {
      this.$router.back()
    },
    // 登录
    async login() {
      // 1. await 修饰 promise
      // 2. res 拿到的是 promise resolve的结果
      // axios对本次请求 resolve的结果
      // 服务器返回的状态码 res.status
      // 服务器返回的真正的数据 res.data
      // 3.err axios封装的promise里 reject的结果
      // err.response.status 拿到服务器返回的状态码
      // err.response.data  服务器返回的真正的数据
      // 4.
      this.$toast.loading({
        message: '加载中..',
        // loading时,点击页面没有反应
        forbidClick: true
      })
      try {
        const res = await login(this.mobile, this.code)
        // 存储token
        this.$store.commit('setUser', res.data.data)
        this.$toast.success('登录成功')
        this.$router.push('/profile')
      } catch (err) {
        // 拿到后端状态码
        const status = err.response.status
        let message = '登录错误,请刷新~'
        if (status === 400) {
          message = err.response.data.message
        }
        this.$toast.fail(message)
      }
    },
    // 发送验证码
    async sendCode() {
      try {
        // 验证手机号
        await this.$refs.form.validate('mobile')
        // 发送请求,获取验证码
        await sendCode(this.mobile)
        // 显示倒计时
        this.isShowCountDown = true
      } catch (err) {
        // 1.表单校验失败
        if (!err.response) {
          this.$toast.fail('请输入手机号')
        } else {
          // 2.请求失败
          // 404
          // 429
          const status = err.response.status
          if (status === 404 || status === 429) {
            this.$toast.fail(err.response.data.message)
          }
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
// 自定义导航栏样式
// :deep() 穿透scoped样式
.navbar {
  background-color: #3296fc;
  color: #fff;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
.form {
  :deep(.van-field__label) {
    flex: 1;
  }
  :deep(.van-cell__value) {
    flex: 20;
  }
  .toutiao {
    font-size: 0.49333rem;
  }
  .code-btn {
    width: 2.02667rem;
    height: 0.61333rem;
    background: #ededed;
    border: none;
    border-radius: 0.30667rem;
    padding: 0;
    font-size: 0.29333rem;
    color: #666;
  }
}
.van-button--info {
  width: 9.25333rem;
  height: 1.17333rem;
  background: #6db4fb;
  border: none;
  border-radius: 0.13333rem;
}
</style>
