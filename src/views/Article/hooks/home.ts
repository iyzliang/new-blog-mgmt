import Api from '@/api'
import { ref, reactive, onMounted } from 'vue'
import router from '../../../router'

interface SearchData {
  title: string;
  description: string;
  tagId: null | number;
}
interface PageData {
  page: number;
  size: number;
}
interface ArticleRef {
  id: number;
  title: string;
  description?: string;
  tags?: number[];
  cover?: string;
  article: string;
  createTime?: string;
  updateTime?: string;
  status?: boolean;
  userId?: number;
  numofviews?: number;
}
interface TagOptions {
  id: number;
  name: string;
}
export function useArticleHome () {
  const articleRef = ref<ArticleRef[]>([])
  const totalRef = ref<number>(-1)
  const noMore = ref<boolean>(false)
  const tagOptionsRef = ref<TagOptions[]>([
    {
      id: 0,
      name: ''
    }
  ])
  const searchData = reactive<SearchData>({
    title: '',
    description: '',
    tagId: null
  })
  const pageData = reactive<PageData>({
    page: 1,
    size: 10
  })

  const createEmptyArticle = (num: number) => {
    for (let index = 0; index < num; index++) {
      articleRef.value.push({
        id: 0,
        title: '',
        article: ''
      })
    }
  }

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

  const getArticleData = async () => {
    createEmptyArticle(3)
    const articleData = await Api.article.getArticleList({
      ...searchData,
      ...pageData
    })
    articleRef.value = articleRef.value.splice(articleRef.value.length - 3, 3)
    articleRef.value = articleData.data.list
    totalRef.value = articleData.data.total
  }

  const infiniteScrollFn = () => {
    const curCount = pageData.page * pageData.size
    if (totalRef.value > curCount) {
      pageData.page = pageData.page + 1
      getArticleData()
    } else {
      noMore.value = true
    }
  }

  const addArticle = () => {
    router.push({ name: 'article-add' })
  }

  onMounted(() => {
    getTagList()
    getArticleData()
  })
  return {
    articleRef,
    totalRef,
    searchData,
    tagOptionsRef,
    noMore,
    getArticleData,
    infiniteScrollFn,
    addArticle
  }
}
