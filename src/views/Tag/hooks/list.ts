
import Api from '@/api'
import { ref, onMounted } from 'vue'
interface TagItem {
  tagId: number;
  tagName: string;
  createTime: string;
  status: boolean;
}
export function useTagList () {
  const tagListRef = ref<TagItem[]>([])
  const searchRef = ref<string>('')
  const tableLoading = ref<boolean>(false)
  const tagDialog = ref<boolean>(false)
  const tagNameType = ref<boolean>(false)
  const tagNameValue = ref<string>('')
  const newTagLoading = ref<boolean>(false)
  let curItem: TagItem | null = null
  /**
   * 获取tag列表
   */
  const getTagList = async () => {
    tableLoading.value = true
    try {
      const tagList = await Api.tag.getTagList({ tagName: searchRef.value })
      tagListRef.value = tagList.data.list
    } finally {
      tableLoading.value = false
    }
  }
  /**
   * 搜索标签名称
   * @param {String} val 输入标签名称
   */
  const changeTagName = (val: string) => {
    searchRef.value = val
    getTagList()
  }
  /**
   * 新增标签
   */
  const showTagItem = () => {
    tagNameType.value = false
    tagDialog.value = true
  }
  const hideTagItem = () => {
    newTagLoading.value = false
    tagDialog.value = false
    tagNameValue.value = ''
  }
  const postTagName = async () => {
    newTagLoading.value = true
    const ItemRes = await Api.tag.postTagItem({ tagName: tagNameValue.value })
    if (ItemRes.code === 200) {
      hideTagItem()
      getTagList()
    }
  }
  const handleEdit = (tagItem: TagItem) => {
    curItem = tagItem
    tagNameType.value = true
    tagNameValue.value = tagItem.tagName
    tagDialog.value = true
  }
  const editTagName = async () => {
    newTagLoading.value = true
    const ItemRes = await Api.tag.editTagItem(curItem?.tagId, { tagName: tagNameValue.value })
    if (ItemRes.code === 200) {
      hideTagItem()
      getTagList()
    }
  }
  const handleDelete = async (tagItem: TagItem) => {
    tableLoading.value = true
    await Api.tag.deleteTagItem(tagItem.tagId)
    tableLoading.value = false
    getTagList()
  }
  onMounted(() => {
    getTagList()
  })
  return {
    tagListRef,
    searchRef,
    tableLoading,
    tagDialog,
    tagNameType,
    tagNameValue,
    newTagLoading,
    changeTagName,
    showTagItem,
    hideTagItem,
    postTagName,
    editTagName,
    handleEdit,
    handleDelete
  }
}
