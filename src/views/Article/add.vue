<template>
  <div class="article-add">
    <el-form ref="form" :model="formRef" label-width="80px" class="artivle-form">
      <el-form-item label="标题">
        <el-input v-model="formRef.title"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="formRef.description"></el-input>
      </el-form-item>
      <el-form-item label="所属标签">
        <el-select v-model="formRef.tags" multiple placeholder="请选择标签">
          <el-option v-for="item in tagOptionsRef" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上传封面">
        <el-upload
          class="cover-uploader"
          :action="`${baseURL}/api/blog/v1/image`"
          :headers="{Authorization: `Bearer ${accessToken}`}"
          :show-file-list="false"
          :on-success="handleCoverSuccess"
          :before-upload="beforeCoverUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </el-form>
    <v-md-editor v-model="formRef.article" class="article-md" :disabled-menus="[]" @upload-image="handleUploadImage" @save="saveMd"></v-md-editor>
  </div>
</template>
<script>
import { defineComponent, ref, reactive, onMounted } from 'vue'
import Api from '@/api'
import globalConfig from '@/api/config'
const baseUrl = globalConfig.reqConfig.baseURL
const accessToken = localStorage.getItem(globalConfig.accessKey)
export default defineComponent({
  name: 'article-add',

  setup () {
    const tagOptionsRef = ref([{ id: 0, name: '' }])
    const formRef = reactive({
      title: '',
      description: '',
      tags: [],
      cover: '',
      article: ''
    })
    const getTagList = async () => {
      const tagData = await Api.tag.getTagList()
      const options = tagData.data.list.map(item => {
        return {
          id: item.tagId,
          name: item.tagName
        }
      })
      tagOptionsRef.value = options
    }
    const handleUploadImage = async (event, insertImage, files) => {
      const formdata = new FormData()
      formdata.append('file', files[0])
      const imgItem = await Api.image.postImageItem(formdata)
      insertImage({
        url: imgItem.data.url,
        desc: imgItem.data.name
      })
    }
    const saveMd = (text, html) => {
      console.log(text)
      console.log(html)
    }
    const handleCoverSuccess = (response, file, fileList) => {
      console.log(response, file, fileList)
    }
    const beforeCoverUpload = (file) => {
      console.log(file)
    }
    onMounted(() => {
      getTagList()
    })
    return {
      formRef,
      tagOptionsRef,
      handleUploadImage,
      saveMd,
      handleCoverSuccess,
      beforeCoverUpload
    }
  }
})
</script>
<style lang="scss" scoped>
.article-add {
  height: 100%;
  overflow-y: scroll;
  .artivle-form {
    width: 90%;
    .cover-uploader .el-upload {
      width: 200px;
      height: 200px;
      text-align: center;
      line-height: 200px;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .cover-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .cover-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .cover {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
  .article-md {
    height: 500px;
  }
}
</style>
