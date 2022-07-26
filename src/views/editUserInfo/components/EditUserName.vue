<template>
  <div>
    <!-- 昵称导航 -->
    <van-nav-bar
      title="设置昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onEditUserName"
    />
    <!-- 修改名字输入框 -->
    <div class="editName-field">
      <van-field
        v-model.trim="userNewName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入新昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { editUserProfile } from '@/api'
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      userNewName: this.value
    }
  },
  methods: {
    async onEditUserName() {
      this.$toast.loading({
        message: '正在更新...',
        forbidClick: true,
        duration: 0
      })
      try {
        if (!this.userNewName.length) {
          this.$toast('昵称不能为空')
          return
        }
        await editUserProfile({
          name: this.userNewName
        })
        this.$emit('input', this.userNewName)
        this.$emit('close')
        this.$toast.success('修改成功')
      } catch (err) {
        this.$toast.fail('修改失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.editName-field {
  padding: 10px;
}
</style>
