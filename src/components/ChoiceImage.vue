<template>
  <div class="choice-image">
    <el-popover
      placement="left"
      :width="500"
      trigger="click"
      :visible="showPopover"
    >
      <template #reference>
        <el-button type="primary" @click="getImageList(1)">选择图片<i class="el-icon-picture-outline-round el-icon--right"></i></el-button>
      </template>
      <div class="image-list-card" v-infinite-scroll="infiniteScrollFn">
        <el-space wrap alignment="flex-end">
          <div class="img-container" v-for="item in imgList" :key="item.name" @click="choiceImage(item)">
            <el-image style="width: 100%;display: block;" :src="item.url" fit="contain"></el-image>
          </div>
        </el-space>
        <p v-if="!isMoreData" class="no-more">没有更多了</p>
      </div>
    </el-popover>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import Api from '@/api'
export default defineComponent({
  name: 'choice-image',

  emits: ['choice-image'],

  setup (props, ctx) {
    const imgList = ref([])
    const totalRef = ref<number>(-1)
    const pageRef = ref<number>(1)
    const showPopover = ref<boolean>(false)
    const size = 10
    const getImageList = async (page?) => {
      page && (pageRef.value = page)
      const query = {
        page: pageRef.value,
        size
      }
      if (pageRef.value === 1) {
        showPopover.value = true
        imgList.value = []
      }
      const imageData = await Api.image.getImageList(query)
      totalRef.value = imageData.data.total
      imgList.value = imgList.value.concat(imageData.data.list)
    }
    const isMoreData = computed(() => totalRef.value > pageRef.value * size)
    const infiniteScrollFn = async () => {
      if (isMoreData.value) {
        pageRef.value = pageRef.value + 1
        await getImageList()
      }
    }
    const choiceImage = (item) => {
      showPopover.value = false
      ctx.emit('choice-image', item.url)
    }

    return {
      imgList,
      isMoreData,
      showPopover,
      getImageList,
      infiniteScrollFn,
      choiceImage
    }
  }
})
</script>
<style lang="scss" scoped>
.image-list-card {
  overflow-y: scroll;
  width: 100%;
  max-height: 30vh;
  .img-container {
    width: 100px;
    height: 100px;
  }
  .no-more {
    flex: 1;
    text-align: center;
    width: 100%;
  }
}
</style>
