<template>
  <div class="editUser-photo">
    <img class="editUser-img" :src="userImg" alt="" ref="img" />
    <div class="editUser-footBar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="finished" @click="onFinished">完成</div>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { editUserPhoto } from '@/api'
export default {
  props: {
    userImg: {
      type: [String, Object],
      required: true
    }
  },
  data() {
    return {
      cropper: null
    }
  },
  mounted() {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      //   autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false
    })
  },
  methods: {
    onFinished() {
      this.cropper.getCroppedCanvas().toBlob(async (blob) => {
        this.$toast.loading({
          message: '正在更新...',
          forbidClick: true,
          duration: 0
        })
        try {
          const formData = new FormData()
          formData.append('photo', blob)
          const { data } = await editUserPhoto(formData)
          this.$emit('close')
          this.$emit('editNewPhoto', data.data.photo)
          this.$toast.success('修改成功')
        } catch (err) {
          this.$toast.fail('修改失败')
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.editUser-photo {
  background-color: #000;
  height: 100%;
}
.editUser-img {
  display: block;
  max-width: 100%;
}
.editUser-footBar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
}
.cancel {
  width: 90px;
  height: 90px;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}
.finished {
  width: 90px;
  height: 90px;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}
</style>
