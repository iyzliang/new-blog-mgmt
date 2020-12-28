<template>
  <div class="view-container tag-list" v-loading="pageLoadingRef">
    <div class="container-handle">
      <div class="handle-input">
        <el-input v-model="searchRef" placeholder="查询图片名称" @change="searchImageName"></el-input>
      </div>
      <div class="handle-button">
        <el-button type="success" round @click="uploadImage">上传图片</el-button>
      </div>
    </div>
    <div class="container-tabel">
      <el-space wrap alignment="flex-end">
        <div class="img-block" v-for="item in imageListRef" :key="item.name">
          <el-image style="width: 100%" :src="item.url" fit="contain" lazy></el-image>
          <p class="img-name">{{ item.name }}</p>
        </div>
      </el-space>
      <el-button type="info" size="small" round class="more-btn" v-if="isShowMore" @click="getMoreData">加载更多</el-button>
    </div>
    <input type="file" v-show="false" ref="uploadFileInput" accept="image/*" @change="choiceFile">
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useImage } from './hooks'
export default defineComponent({
  name: 'image-home',

  setup () {
    const { imageListRef, totalRef, pageLoadingRef, searchRef, uploadFileInput, isShowMore, getImageData, searchImageName, uploadImage, choiceFile, getMoreData } = useImage()
    return {
      imageListRef,
      totalRef,
      pageLoadingRef,
      searchRef,
      uploadFileInput,
      isShowMore,
      getImageData,
      searchImageName,
      uploadImage,
      choiceFile,
      getMoreData
    }
  }
})
</script>

<style lang="scss" scoped>
.view-container {
  --pagination-height: 0px;
  .container-tabel {
    .img-block {
      width: 200px;
      height: auto;
      margin-bottom: 30px;
      margin-left: 30px;
      overflow: hidden;
      border-radius: 5px;
      .img-name {
        width: 100%;
        height: 30px;
        line-height: 30px;
        background-color: #fff;
        font-size: 14px;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
        &:hover {
          color: #409eff;
        }
      }
    }
    .more-btn {
      width: 100%;
    }
  }
}
</style>
