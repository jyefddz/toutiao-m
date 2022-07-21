<template>
  <div>
    <van-cell title="搜索历史">
      <template v-if="isDelHistory">
        <span @click="$emit('clearHistory')">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDelHistory = false">完成</span>
      </template>
      <van-icon v-else @click="isDelHistory = true" name="delete-o" />
    </van-cell>
    <van-cell
      v-for="(item, index) in searchHistories"
      :key="index"
      :title="item"
      @click="onDelHistories(item, index)"
    >
      <template #default>
        <van-icon v-show="isDelHistory" name="close" />
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isDelHistory: false
    }
  },
  methods: {
    onDelHistories(item, index) {
      if (this.isDelHistory) {
        this.searchHistories.splice(index, 1)
        console.log(item)
      } else {
        this.$emit('search', item)
      }
    }
  }
}
</script>

<style></style>
