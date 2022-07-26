<template>
  <div>
    <van-picker
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      :default-index="value"
      @change="onChange"
    />
  </div>
</template>

<script>
import { editUserProfile } from '@/api'
export default {
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      columns: ['女', '男'],
      userNewGender: 0
    }
  },
  methods: {
    async onConfirm() {
      this.$toast.loading({
        message: '正在更新...',
        forbidClick: true,
        duration: 0
      })
      try {
        await editUserProfile({
          gender: this.userNewGender
        })
        this.$emit('input', this.userNewGender)
        this.$emit('close')
        this.$toast.success('修改成功')
      } catch (err) {
        this.$toast.fail('修改失败')
      }
    },
    onChange(picker, value, index) {
      this.userNewGender = index
    }
  }
}
</script>

<style></style>
