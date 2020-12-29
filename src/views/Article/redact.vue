<template>
  <div class="article-add">
    <div class="article-info-container">
      <div class="article-row">
        <div class="article-col">
          <span>文章标题：</span>
          <el-input style="width: 200px" v-model="formRef.title" size="mini" placeholder="请输入标题"></el-input>
        </div>
        <div class="article-col">
          <span>文章标签：</span>
          <el-select v-model="formRef.tags" size="mini" multiple placeholder="请选择标签">
            <el-option
              v-for="item in tagOptionsRef"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="article-row" style="marginTop: 30px">
        <div class="article-desc">
          <span>描述：</span>
          <el-input
            size="mini"
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="formRef.description">
          </el-input>
        </div>
        <div class="article-cover">
          <span>封面：</span>
          <el-button type="primary" v-if="!formRef.cover" @click="uploadImage">上传<i class="el-icon-upload el-icon--right"></i></el-button>
          <img v-else :src="formRef.cover" class="cover-img">
          <input type="file" v-show="false" ref="uploadFileInput" accept="image/*" @change="choiceFile">
        </div>
      </div>
    </div>
    <v-md-editor v-model="formRef.article" class="article-md" :disabled-menus="[]" @upload-image="handleUploadImage" @save="articleId ? editArticle() : saveArticle()"></v-md-editor>
    <div class="handle-button">
      <el-button type="primary" @click="articleId ? editArticle() : saveArticle()">{{ articleId ? '修 改' : '新 增' }}</el-button>
      <el-button @click="router.back(-1)">返 回</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useArticleAdd } from './hooks/redact'
import router from '@/router'
export default defineComponent({
  name: 'article-add',

  props: {
    id: {
      type: Number
    }
  },

  setup (props) {
    const rticleAdd = useArticleAdd(props)

    return {
      ...rticleAdd,
      router
    }
  }
})
</script>
<style lang="scss" scoped>
.article-add {
  height: 100%;
  overflow-y: scroll;
  .article-info-container {
    width: 100%;
    background-color: #FFF;
    border-radius: 10px;
    overflow: hidden;
    padding: 40px;
    box-sizing: border-box;
    .article-row {
      width: 100%;
      display: flex;
      align-items: flex-start;
      .article-col {
        flex: 1;
      }
      .article-cover {
        flex: 1;
        display: flex;
        align-items: flex-start;
        .cover-img {
          height: 100px;
          width: auto;
        }
        > span {
          margin-top: 15px;
          display: block;
          width: 70px;
        }
      }
      .article-desc {
        flex: 1;
        display: flex;
        padding: 0 20px;
        align-items: flex-start;
        > span {
          margin-top: 15px;
          display: block;
          width: 70px;
        }
      }
    }
  }
  .article-md {
    margin-top: 30px;
    height: 600px;
  }
  .handle-button {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
