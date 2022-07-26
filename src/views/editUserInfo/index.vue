<template>
  <div>
    <!-- 导航 -->
    <van-nav-bar
      class="detailNavbar"
      title="我的信息"
      left-arrow
      @click-left="backTopPage"
    />
    <!-- 上传头像 -->
    <input type="file" hidden ref="file" @change="onFileChange" />
    <!-- 个人信息 -->
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image
        width="35px"
        height="35px"
        fit="cover"
        round
        :src="userProfile.photo"
      />
    </van-cell>
    <van-cell
      title="昵称"
      :value="userProfile.name"
      is-link
      @click="isNameShow = true"
    ></van-cell>
    <van-cell
      title="性别"
      :value="userProfile.gender === 0 ? '女' : '男'"
      is-link
      @click="isGenderShow = true"
    ></van-cell>
    <van-cell
      title="生日"
      :value="userProfile.birthday"
      is-link
      @click="isBirthdayShow = true"
    ></van-cell>

    <!-- 编辑昵称 -->
    <van-popup
      v-if="isNameShow"
      class="editName-popup"
      v-model="isNameShow"
      position="bottom"
      style="height: 100%"
    >
      <EditUserName
        @close="isNameShow = false"
        v-model="userProfile.name"
      ></EditUserName>
    </van-popup>

    <!-- 编辑性别 -->
    <van-popup v-model="isGenderShow" position="bottom">
      <EditUserGender
        v-if="isGenderShow"
        @close="isGenderShow = false"
        v-model="userProfile.gender"
      ></EditUserGender>
    </van-popup>

    <!-- 编辑生日 -->
    <van-popup v-model="isBirthdayShow" position="bottom">
      <EditUserBirthday
        v-if="isBirthdayShow"
        @close="isBirthdayShow = false"
        v-model="userProfile.birthday"
      ></EditUserBirthday>
    </van-popup>

    <!-- 编辑头像 -->
    <van-popup v-model="isPhotoShow" position="bottom" style="height: 100%">
      <EditUserPhoto
        v-if="isPhotoShow"
        :userImg="userImg"
        @close="isPhotoShow = false"
        @editNewPhoto="userProfile.photo = $event"
      ></EditUserPhoto>
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api'
import EditUserName from './components/EditUserName.vue'
import EditUserGender from './components/EditUserGender.vue'
import EditUserBirthday from './components/EditUserBirthday.vue'
import EditUserPhoto from './components/EditUserPhoto.vue'
export default {
  components: {
    EditUserName,
    EditUserGender,
    EditUserBirthday,
    EditUserPhoto
  },
  data() {
    return {
      userProfile: {},
      isNameShow: false,
      isGenderShow: false,
      isBirthdayShow: false,
      isPhotoShow: false,
      userImg: null
    }
  },
  created() {
    this.getUserProfile()
  },
  methods: {
    backTopPage() {
      this.$router.go(-1)
    },
    async getUserProfile() {
      try {
        const res = await getUserProfile()
        this.userProfile = res.data.data
      } catch (err) {
        this.$toast('获取信息失败')
      }
    },
    onFileChange() {
      const file = this.$refs.file.files[0]
      this.userImg = window.URL.createObjectURL(file)
      this.isPhotoShow = true
      this.$refs.file.value = ''
    }
  }
}
</script>

<style scoped lang="less">
.detailNavbar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  :deep(.van-icon-arrow-left) {
    color: #fff;
  }
}

.editName-popup {
  background-color: #f5f7f9;
}
</style>
