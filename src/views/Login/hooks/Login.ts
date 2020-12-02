import { ref } from 'vue'
import { ElLoading } from 'element-plus'

export function useLogin () {
  const username = ref<string>('')
  const password = ref<string>('')
  const onSubmit = async () => {
    console.log('--')
    console.log(username.value)
    console.log(password.value)
    ElLoading.service()
  }
  return {
    username,
    password,
    onSubmit
  }
}
