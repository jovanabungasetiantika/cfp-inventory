import { FETCH_INDEX, FETCH_INDEX_SUCCESS, FETCH_INDEX_FAIL } from '../constants/fetch'

const defaultIndexTypes = [FETCH_INDEX, FETCH_INDEX_SUCCESS, FETCH_INDEX_FAIL]

export const fetchIndex = (url, params = {}, data = {}, types = defaultIndexTypes) => ({
  types,
  payload: {
    request: {
      method: 'GET', url, params, data,
    },
  },
})

export const fetchPost = (url, params = {}, data = {}, types = defaultIndexTypes) => ({
  types,
  payload: {
    request: {
      method: 'POST', url, params, data,
    },
  },
})

export const fetchPatch = (url, params = {}, data = {}, types = defaultIndexTypes) => ({
  types,
  payload: {
    request: {
      method: 'PATCH', url, params, data,
    },
  },
})

export const fetchDelete = (url, params = {}, data = {}, types = defaultIndexTypes) => ({
  types,
  payload: {
    request: {
      method: 'DELETE', url, params, data,
    },
  },
})

export const fetchDownload = (url, params = {}, data = {}, types = defaultIndexTypes) => ({
  types,
  payload: {
    request: {
      method: 'POST', url, params, data,
      responseType: 'blob',
    },
  },
})



export { fetchIndex as default }
