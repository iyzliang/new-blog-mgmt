
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
  const getTagList = async (data?) => {
    const tagList: TagItem[] = Api.tag.getTagList(data)
    tagListRef.value = tagList
  }
  onMounted(() => {
    getTagList()
  })
  return {
    tagListRef,
    getTagList
  }
}
