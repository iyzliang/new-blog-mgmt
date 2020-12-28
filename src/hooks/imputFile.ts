import { ref } from 'vue'

export function useInputFile (cb) {
  const uploadFileInput = ref<HTMLElement>()
  const uploadImage = () => {
    if (uploadFileInput.value) {
      (uploadFileInput.value as HTMLInputElement).value = ''
      uploadFileInput.value.click()
    }
  }

  const choiceFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const formdata = new FormData()
    formdata.append('file', file)
    cb(formdata)
  }

  return {
    uploadFileInput,
    uploadImage,
    choiceFile
  }
}
