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
    <van-form class="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        type="code"
        name="密码"
        placeholder="请输入验证码"
        :rules="[{ required: true, message: '请填写验证码' }]"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>

        <template #right-icon>
          <van-button class="code-btn" size="mini">发送验证码</van-button>
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit" @click="login"
          >登录</van-button
        >
      </div>
    </van-form>

    <!-- 登录按钮 -->
  </div>
</template>

<script>
// 引入api
import { login } from '@/api/user'
// form表单域里 在任意的button点击都可以触发submit
export default {
  data() {
    return {
      mobile: '',
      code: ''
    }
  },
  methods: {
    // 返回来之前的页面
    backTopPage() {
      this.$router.back()
    },
    // 登录
    async login() {
      const res = await login(this.mobile, this.code)
      console.log(res)
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
