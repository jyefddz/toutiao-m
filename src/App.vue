<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
// 1.下载 axios
// 2.axios默认配置
// 3. 需要在每一次请求前 自动加上token
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
