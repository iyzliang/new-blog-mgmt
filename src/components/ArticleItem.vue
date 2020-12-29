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
            <div class="article-time">
              <p class="time">
                <i class="el-icon-time"></i>
                {{ articleData.updateTime }}
              </p>
              <div class="article-tag" v-for="item in articleData.tags" :key="item.id">{{ item.name }}</div>
            </div>
          </div>
          <div class="handle-right">
            <i class="el-icon-edit-outline handle-btn" @click="editArticle"></i>
            <i class="el-icon-delete handle-btn" @click="deleteArticle"></i>
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
  },

  emits: ['edit-article', 'delete-article'],

  setup (props, ctx) {
    const editArticle = () => {
      ctx.emit('edit-article', props.articleData.id)
    }
    const deleteArticle = () => {
      ctx.emit('delete-article', props.articleData.id)
    }
    return {
      editArticle,
      deleteArticle
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
    overflow: hidden;
    box-sizing: border-box;
    position: relative;
    .article-cover {
      width: 200px;
      height: auto;
    }
    .article-cover + .article-content {
      margin-left: 30px;
    }
    .article-content {
      width: calc(100% - 230px);
      .article-title {
        color: #333;
        width: 100%;
        height: 30px;
        line-height: 30px;
        font-size: 20px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
      .article-description {
        width: 100%;
        color: #999;
        min-height: 48px;
        margin-top: 10px;
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
      .article-time {
        color: #333;
        width: 100%;
        margin-top: 20px;
        text-align: right;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .tiem {
          height: 26px;
          padding-left: 30px;
          color: #99a9bf;
          > i {
            font-size: 20px;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
          }
        }
        .article-tag {
          margin-left: 20px;
          height: 26px;
          line-height: 26px;
          padding: 0 10px;
          border-radius: 4px;
          border: 1px solid #cccccc;
        }
      }
    }
    .handle-right {
      width: 150px;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      background-color: rgba($color: #000000, $alpha: 0.5);
      padding: 0 60px;
      display: flex;
      flex-wrap: wrap;
      align-content: space-around;
      transform: translateX(150px);
      opacity: 0;
      transition: all 0.5s;
      .handle-btn {
        font-size: 30px;
        color: #FFF;
        display: block;
        cursor: pointer;
        &:hover {
          color: #409eff;
        }
      }
    }
    &:hover {
      .handle-right {
        transform: translateX(0);
        opacity: 1;
      }
    }
  }
}
</style>
