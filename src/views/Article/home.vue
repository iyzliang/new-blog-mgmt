<template>
  <div class="view-container article-home">
    <div class="container-handle">
      <div class="handle-input">
        <el-input v-model="searchData.title" placeholder="文章标题" @change="getArticleData"></el-input>
        <el-input v-model="searchData.description" placeholder="文章描述" @change="getArticleData"></el-input>
        <el-select v-model="searchData.tagId" placeholder="请选择标签" clearable @change="getArticleData">
          <el-option
            v-for="item in tagOptionsRef"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="handle-button">
        <el-button type="success" round @click="addArticle">写文章</el-button>
      </div>
    </div>
    <div class="container-tabel" v-infinite-scroll="infiniteScrollFn">
      <article-item v-for="item in articleRef" :key="item.id" :articleLoading="loadingRef" :articleData="item"></article-item>
      <p v-if="noMore" class="no-more">没有更多了</p>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import { useArticleHome } from './hooks/home'
import ArticleItem from '@/components/ArticleItem.vue'
export default defineComponent({
  name: 'article-home',

  components: {
    ArticleItem
  },

  setup () {
    const articlData = useArticleHome()

    return {
      ...articlData
    }
  }
})
</script>
<style lang="scss" scoped>
.no-more {
  line-height: 1.5;
  font-size: 14px;
  color: #5e6d82;
  text-align: center;
  margin-top: 14px;
}
</style>
