import store from '@/store'
import router from '@/router'
export function checkStatus(response) {
  if (response) {
    const { status, statusText } = response
    const e = { code: status, message: statusText.length > 0 ? statusText : '服务端发生未知错误' }
    if (status !== 200 && status !== 304) {
      switch (status) {
        case 401:
          router.push('/401')
          break
        case 403:
          router.push('/403')
          break
        case 404:
          router.push('/404')
          break
        case 500:
          router.push('/500')
          break
        default: throw e
      }
    }
    return response
  } else {
    const e = { message: '服务器连接丢失' }
    throw e
  }
}

export function checkCode(response) {
  const { data: { code, message }} = response
  // const originalRequest = config
  const e = { code, message }
  if (code !== 200) {
    switch (code) {
      case 401100:
        store.dispatch('FedLogOut').then(() => {
          location.reload()
        })
        break
      case 401104:
        store.dispatch('FedLogOut').then(() => {
          location.reload()
        })
        break
      case 401105:
        store.dispatch('FedLogOut').then(() => {
          location.reload()
        })
        break
      case 403:
        router.push('/403')
        break
      default: throw e
    }
  }
  return response
}