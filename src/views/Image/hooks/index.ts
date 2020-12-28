
import Api from '@/api'
import { ref, onMounted, computed } from 'vue'
import { useInputFile } from '@/hooks/imputFile'
import { useToast } from 'vue-toastification'
import Clipboard from 'clipboard'

interface ImageItem {
  name: string;
  url: string;
  createTime: string;
}

export function useImage () {
  const imageListRef = ref<ImageItem[]>([])
  const searchRef = ref<string>('')
  const pageRef = ref<number>(1)
  const totalRef = ref<number>(0)
  const size = 10
  const $toast = useToast()

  /**
   * 获取图片列表
   */
  const getImageData = async () => {
    const query = {
      page: pageRef.value,
      size,
      name: searchRef.value
    }
    const imageData = await Api.image.getImageList(query)
    totalRef.value = imageData.data.total
    imageListRef.value = imageListRef.value.concat(imageData.data.list)
  }

  /**
   * 搜索图片名称
   */
  const searchImageName = async () => {
    pageRef.value = 1
    imageListRef.value = []
    await getImageData()
  }

  /**
   * 上传图片
   * @param formdata 文件数据
   */
  const postItem = async (formdata) => {
    await Api.image.postImageItem(formdata)
    await searchImageName()
  }

  const isShowMore = computed(() => totalRef.value > pageRef.value * size)
  const getMoreData = async () => {
    if (isShowMore.value) {
      pageRef.value = pageRef.value + 1
      await getImageData()
    }
  }

  const copyUrl = (url) => {
    console.log(url)
    const clipboard = new Clipboard('.copy-dom', {
      text: () => {
        return url
      }
    })
    clipboard.on('success', () => {
      $toast.success('复制成功')
      clipboard.destroy()
    })
    clipboard.on('error', () => {
      $toast.error('该浏览器不支持自动复制')
      clipboard.destroy()
    })
  }

  const deleteImage = async (name) => {
    await Api.image.deleteImageItem({ name })
    imageListRef.value = imageListRef.value.filter(item => item.name !== name)
  }

  onMounted(() => {
    getImageData()
  })

  const inputFile = useInputFile(postItem)
  return {
    imageListRef,
    searchRef,
    isShowMore,
    getImageData,
    searchImageName,
    getMoreData,
    copyUrl,
    deleteImage,
    ...inputFile
  }
}
