import { ref, reactive, onMounted } from 'vue'
import Api from '@/api'
import { useInputFile } from '@/hooks/imputFile'
import { useToast } from 'vue-toastification'

export function useArticleAdd (props) {
  const $toast = useToast()
  const articleId = ref(null)
  const tagOptionsRef = ref([{ id: 0, name: '' }])
  const formRef = reactive({
    title: '',
    description: '',
    tags: [],
    cover: '',
    article: ''
  })
  if (props.id) {
    articleId.value = props.id
    onMounted(async () => {
      const articleItem = await Api.article.detailArticleItem(articleId.value)
      const { title, description, tags, cover, article } = articleItem.data
      formRef.title = title
      formRef.description = description
      formRef.tags = tags.map(item => item.id)
      formRef.cover = cover
      formRef.article = article
    })
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

  const postItem = async (formdata) => {
    const newImage = await Api.image.postImageItem(formdata)
    formRef.cover = newImage.data.url
  }

  const inputFile = useInputFile(postItem)

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
    $toast.success('保存成功')
  }

  const editArticle = async () => {
    await Api.article.editArticleItem(articleId.value, {
      ...formRef
    })
    $toast.success('修改成功')
  }

  const choiceImageFn = (url) => {
    formRef.cover = url
  }

  onMounted(() => {
    getTagList()
  })

  return {
    tagOptionsRef,
    formRef,
    articleId,
    getTagList,
    handleUploadImage,
    saveArticle,
    editArticle,
    choiceImageFn,
    ...inputFile
  }
}
