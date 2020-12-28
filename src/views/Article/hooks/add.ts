import { ref, reactive, onMounted } from 'vue'
import Api from '@/api'

export function useArticleAdd () {
  const articleId = ref(null)
  const tagOptionsRef = ref([{ id: 0, name: '' }])
  const formRef = reactive({
    title: '',
    description: '',
    tags: [],
    cover: '',
    article: ''
  })
  const uploadFileInput = ref<HTMLElement>()
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
  const uploadImage = () => {
    if (uploadFileInput.value) {
      (uploadFileInput.value as HTMLInputElement).value = ''
      uploadFileInput.value.click()
    }
  }
  const choiceFile = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    const formdata = new FormData()
    formdata.append('file', file)
    const newImage = await Api.image.postImageItem(formdata)
    formRef.cover = newImage.data.url
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

  const saveArticle = async () => {
    const newArticle = await Api.article.postArticleItem({
      ...formRef
    })
    articleId.value = newArticle.data.id
  }

  const editArticle = async () => {
    console.log('保存')
  }

  onMounted(() => {
    getTagList()
  })

  return {
    tagOptionsRef,
    formRef,
    uploadFileInput,
    articleId,
    getTagList,
    uploadImage,
    choiceFile,
    handleUploadImage,
    saveArticle,
    editArticle
  }
}
