<template>
  <div class="article-item">
    <el-skeleton class="article-skeleton" animated :throttle="500" :loading="!articleData.title">
      <template #template>
        <el-skeleton-item class="article-cover" variant="image"/>
        <div class="article-content">
          <el-skeleton-item variant="h2" style="width: 50%;" />
          <div class="article-content-des">
            <el-skeleton-item variant="text" style="margin-right: 16px;" />
            <el-skeleton-item variant="text" />
            <el-skeleton-item variant="text" />
            <el-skeleton-item variant="text" style="width: 30%;" />
          </div>
          <div class="article-content-time">
            <el-skeleton-item variant="text" style="width: 200px;" />
            <el-skeleton-item variant="button" style="width:30px;height:20px;margin-left:10px"/>
            <el-skeleton-item variant="button" style="width:30px;height:20px;margin-left:10px"/>
          </div>
        </div>
      </template>
      <template #default>
        <div class="article-main">
          <el-image class="article-cover" cover :src="articleData.cover || 'http://data-test.iyzliang.cn/images/5fe5c40bb1d25c09bc8334ce.jpg'">
          </el-image>
          <div class="article-content">
            <h2 class="article-title">{{ articleData.title }}</h2>
            <p class="article-description">{{ articleData.description }}</p>
          </div>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'article-item',

  props: {
    articleData: {
      type: Array,
      default: () => []
    }
  }
})
</script>
<style lang="scss" scoped>
.article-item {
  width: 100%;
  margin-top: 30px;
  .article-skeleton {
    width: 90%;
    height: auto;
    margin: 0 auto;
    display: flex;
    background-color: #FFF;
    border-radius: 10px;
    padding: 10px;
    .article-cover {
      width: 200px;
      height: 200px;
      display: block;
      text-align: center;
      line-height: 200px;
    }
    .article-content {
      margin-left: 30px;
      flex: auto;
      .article-content-des {
        padding: 30px 0;
      }
      .article-content-time {
        margin-top: 40px;
        text-align: right;
      }
    }
  }
  .article-main {
    width: 90%;
    height: auto;
    margin: 0 auto;
    display: flex;
    background-color: #FFF;
    border-radius: 10px;
    padding: 10px;
    .article-cover {
      width: 200px;
      height: auto;
    }
    .article-cover + .article-content {
      margin-left: 30px;
    }
    .article-content {
      flex: auto;
      .article-title {
        height: 30px;
        line-height: 30px;
        font-size: 20px;
      }
      .article-content-des {
        padding: 30px 0;
      }
      .article-content-time {
        margin-top: 40px;
        text-align: right;
      }
    }
  }
}
</style>
