import axios from 'axios'
import store from '~/store/index'
import router from '~/router/index'
import { api } from '~/config'
import { app } from '~/app'

axios.interceptors.request.use(config => {
  config.headers['X-Requested-With'] = 'XMLHttpRequest'

  const token = store.getters['auth/token']
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token
  }

  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, async error => {
  if (store.getters['auth/token']) {
    // TODO: Find more reliable way to determine when Token state
    if (error.response.status === 401 && error.response.data.message === 'Token has expired') {
      const { data } = await axios.post(api.path('login.refresh'))
      store.dispatch('auth/saveToken', data)
      return axios.request(error.config)
    }

    if (error.response.status === 401 ||
      (error.response.status === 500 && (
        error.response.data.message === 'Token has expired and can no longer be refreshed' ||
        error.response.data.message === 'The token has been blacklisted'
      ))
    ) {
      store.dispatch('auth/destroy')
      router.push({ name: 'login' })
    }
  }

  error.response.data.message !== undefined && app.$toast.error(error.response.data.message || 'Something went wrong.')
  error.response.data.error !== undefined && app.$toast.error(error.response.data.error || 'Error occurred.')
  return Promise.reject(error)
})
