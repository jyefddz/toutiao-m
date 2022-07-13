<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
// 1.下载 axios
// 2.axios默认配置
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
