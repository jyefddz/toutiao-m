<template>
  <!-- 弹框 -->
  <van-popup
    v-model="isShow"
    position="bottom"
    :style="{ height: '93%' }"
    closeable
    close-icon-position="top-left"
  >
    <div class="popupMain">
      <!-- 我的频道 -->
      <div class="my-channel">
        <!-- 我的频道标题 -->
        <van-cell title="我的频道">
          <van-button class="edit-btn" size="small" round>编辑</van-button>
        </van-cell>
        <!-- 我的频道宫格 -->
        <van-grid :border="false" gutter="10px">
          <van-grid-item
            v-for="item in myChannels"
            :key="item.id"
            :text="item.name"
          >
            <template #icon>
              <van-icon name="cross"></van-icon>
            </template>
          </van-grid-item>
        </van-grid>
      </div>

      <!-- 推荐频道 -->
      <div class="recommend-channel">
        <!-- 推荐频道标题 -->
        <van-cell title="推荐频道"></van-cell>
        <!-- 推荐频道宫格 -->
        <van-grid :border="false" gutter="10px">
          <van-grid-item
            v-for="item in recommendChannels"
            :key="item.id"
            :text="item.name"
            icon="plus"
          ></van-grid-item>
        </van-grid>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { getAllChannels } from '@/api'
/*
1. filter方法的返回值是什么? 新数组
2. 函数
find
1). find的函数的返回值 --> 查找到了返回当前的元素, 没查到就返回undifined
*/
export default {
  data() {
    return {
      isShow: false,
      allChannels: []
    }
  },
  props: {
    myChannels: {
      type: Array,
      required: true
    }
  },
  created() {
    this.getAllChannels()
  },
  methods: {
    // 获取所有频道列表并处理数据
    async getAllChannels() {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
      console.log(data)
    }
  },
  computed: {
    recommendChannels() {
      // 在所有的频道中 减去 我的频道
      // 所有的频道中 筛选掉 我的频道
      return this.allChannels.filter((item) => {
        // 所有频道的每一项
        // const result = this.myChannels.find((i) => i.id === item.id)
        // if (result) {
        //   return false
        // } else {
        //   return true
        // }
        return !this.myChannels.find((i) => i.id === item.id)
      })
    }
  }
}
</script>

<style scoped lang="less">
.popupMain {
  padding-top: 100px;
  .edit-btn {
    color: red;
    padding: 0 30px;
    height: 48px;
    border: 00.02667rem solid red;
  }

  //   我的频道的样式
  .my-channel {
    :deep(.van-grid-item__content) {
      position: relative;
      background-color: #eee;

      .van-grid-item__icon-wrapper {
        position: absolute;
        top: 0;
        right: 0;

        .van-icon-cross {
          position: absolute;
          top: 0;
          right: 0;
          transform: translate(20%, -35%);
          border: 0.02667rem solid #000;
          border-radius: 50%;
          text-align: center;
          line-height: 0.32rem;
          height: 24px;
          width: 24px;
          font-size: 24px;
        }
      }
    }
  }
  // 推荐频道的样式
  .recommend-channel {
    // 推荐频道加号样式
    :deep(.van-grid-item__content) {
      flex-direction: row;
      background-color: #eee;

      .van-grid-item__icon {
        font-size: 0.5rem;
      }

      .van-grid-item__text {
        margin-top: 0;
      }
    }
  }
}
</style>
