import { ref } from 'vue'

export function useLogin () {
  const username = ref<string>('')
  const password = ref<string>('')
  const onSubmit = async () => {
    console.log('--')
    console.log(username.value)
    console.log(password.value)
  }
  return {
    username,
    password,
    onSubmit
  }
}
