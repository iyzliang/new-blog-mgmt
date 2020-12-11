import { ref } from 'vue'
import { ElLoading } from 'element-plus'
import { useToast } from 'vue-toastification'
import Api from '@/api'
import globalConfig from '@/api/config'
import router from '@/router'

export function useLogin () {
  let loadingInstance
  const $toast = useToast()
  const username = ref<string>('')
  const password = ref<string>('')

  const checkQuery = (): string | boolean => {
    if (!username.value) return '请输入用户名'
    if (!password.value) return '请输入密码'
    return false
  }
  const onSubmit = async () => {
    const checkText = checkQuery()
    try {
      if (checkText) {
        $toast.warning(checkText)
      } else {
        loadingInstance = ElLoading.service()
        const accessData = await Api.common.login({
          username: username.value,
          password: password.value
        })
        localStorage.setItem(globalConfig.accessKey, accessData.data.accessToken)
        localStorage.setItem(globalConfig.refreshKey, accessData.data.refreshToken)
        localStorage.setItem(globalConfig.expiresKey, accessData.data.expiresIn)
        loadingInstance.close()
        router.push('/')
      }
    } finally {
      loadingInstance && loadingInstance.close()
    }
  }
  return {
    username,
    password,
    onSubmit
  }
}
