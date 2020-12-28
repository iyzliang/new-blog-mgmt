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
      <div class="img-space" wrap alignment="flex-end">
        <div class="img-block" v-for="item in imageListRef" :key="item.name">
          <el-image style="width: 100%;height: 200px;display: block;" :src="item.url" fit="contain" lazy :preview-src-list="[item.url]"></el-image>
          <p class="img-name copy-dom" @click="copyUrl(item.url)">{{ item.name }}</p>
          <i class="el-icon-delete" @click="deleteImage(item.name)"></i>
        </div>
      </div>
      <el-button size="small" round class="more-btn" v-if="isShowMore" @click="getMoreData">加载更多</el-button>
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
    const useImageData = useImage()
    return {
      ...useImageData
    }
  }
})
</script>

<style lang="scss" scoped>
.view-container {
  --pagination-height: 0px;
  .container-tabel {
    .img-space {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: flex-end;
      justify-content: space-around;
      .img-block {
        width: 200px;
        height: 230px;
        margin-bottom: 30px;
        margin-left: 30px;
        overflow: hidden;
        border-radius: 10px;
        position: relative;
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
        .el-icon-delete {
          display: none;
          font-size: 20px;
          position: absolute;
          right: 10px;
          top: 10px;
          cursor: pointer;
          &:hover {
            color: #409eff;
          }
        }
        &:hover {
          .el-icon-delete {
            display: block;
          }
        }
      }
    }
    .more-btn {
      line-height: 1.5;
      font-size: 14px;
      width: 100%;
      text-align: center;
      margin-top: 14px;
    }
  }
}
</style>
