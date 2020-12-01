import { ref } from 'vue'

export function useTitle (titleString: string) {
  const titleArray = ref<string[]>(titleString.split(''))

  return {
    titleArray
  }
}
