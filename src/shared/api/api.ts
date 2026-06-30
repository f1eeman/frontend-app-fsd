import axios from 'axios'
import { USER_LOCALSTORAGE_KEY } from '@/shared/consts/localstorage'

export const $api = axios.create({
  baseURL: __API__,
})

$api.interceptors.request.use((config) => {
  config.headers.authorization =
    localStorage.getItem(USER_LOCALSTORAGE_KEY) || ''
  return config
})
