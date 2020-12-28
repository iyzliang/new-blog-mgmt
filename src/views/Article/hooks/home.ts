import Api from '@/api'
import { ref, reactive, onMounted, computed } from 'vue'
import router from '@/router'

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
    size: 5
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
    articleRef.value = articleRef.value.filter(item => item.title)
    articleRef.value = articleRef.value.concat(articleData.data.list)
    totalRef.value = articleData.data.total
  }

  const searchArticle = async () => {
    pageData.page = 1
    articleRef.value = []
    await getArticleData()
  }

  const isMoreData = computed(() => totalRef.value > pageData.page * pageData.size)
  const infiniteScrollFn = async () => {
    if (isMoreData.value) {
      pageData.page = pageData.page + 1
      await getArticleData()
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
    isMoreData,
    getArticleData,
    searchArticle,
    infiniteScrollFn,
    addArticle
  }
}
