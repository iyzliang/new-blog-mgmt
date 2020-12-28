
import Api from '@/api'
import { ref, onMounted, computed } from 'vue'

interface ImageItem {
  name: string;
  url: string;
  createTime: string;
}

export function useImage () {
  const imageListRef = ref<ImageItem[]>([])
  const totalRef = ref<number>(0)
  const pageRef = ref<number>(1)
  const sizeRef = ref<number>(10)
  const pageLoadingRef = ref<boolean>(false)
  const searchRef = ref<string>('')
  const uploadFileInput = ref<HTMLElement>()

  const getImageData = async () => {
    const query = {
      page: pageRef.value,
      size: sizeRef.value,
      name: searchRef.value
    }
    pageLoadingRef.value = true
    try {
      const imageData = await Api.image.getImageList(query)
      totalRef.value = imageData.data.total
      imageListRef.value = imageListRef.value.concat(imageData.data.list)
    } finally {
      pageLoadingRef.value = false
    }
  }

  const searchImageName = async () => {
    pageRef.value = 1
    imageListRef.value = []
    await getImageData()
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
    pageLoadingRef.value = true
    try {
      const formdata = new FormData()
      formdata.append('file', file)
      await Api.image.postImageItem(formdata)
      await searchImageName()
    } finally {
      pageLoadingRef.value = false
    }
  }

  const getMoreData = async () => {
    pageRef.value = pageRef.value + 1
    await getImageData()
  }

  const isShowMore = computed(() => totalRef.value > pageRef.value * sizeRef.value)

  onMounted(() => {
    getImageData()
  })

  return {
    imageListRef,
    totalRef,
    pageLoadingRef,
    searchRef,
    uploadFileInput,
    isShowMore,
    getImageData,
    searchImageName,
    uploadImage,
    choiceFile,
    getMoreData
  }
}
