<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
// 1.下载 axios
// 2.axios默认配置
// 3. 需要在每一次请求前 自动加上token

// tabs频道持久化状态
// -离线状态
//  - 后台返回的频道是默认的
//  - 保存在本地存储中

// -登录状态
//  - 后台返回的频道是用户的
//  - 保存在服务器中
import request from '@/utils/request'
export default {
  data() {
    return {}
  },
  created() {
    console.dir(request)
  }
}
</script>

<style scoped></style>
