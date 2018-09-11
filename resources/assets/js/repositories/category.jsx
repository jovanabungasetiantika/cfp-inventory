import baseUrl from '../constants/url'
import {
  fetchIndex,
  fetchPost,
  fetchPatch,
  fetchDelete,
} from '../actions/fetch'
import {
  CATEGORY_LIST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_DETAIL,
  CATEGORY_DETAIL_SUCCESS,
  CATEGORY_DETAIL_FAIL,
  CATEGORY_SAVE,
  CATEGORY_SAVE_SUCCESS,
  CATEGORY_SAVE_FAIL,
  CATEGORY_UPDATE,
  CATEGORY_UPDATE_SUCCESS,
  CATEGORY_UPDATE_FAIL,
  CATEGORY_DELETE,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_FAIL,
  CATEGORY_DELETE_LIST,
  CATEGORY_DELETE_LIST_SUCCESS,
  CATEGORY_DELETE_LIST_FAIL,
  CATEGORY_CLEAN_FAIL,
  CATEGORY_CLEAN_SUCCESS,
} from '../constants/category'

const categoryListsType = [
  CATEGORY_LIST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
]

export const categoryIndex = (page, perPage) => dispatch => {
  const pageParam = page ? `page=${page}` : undefined
  const perPageParam = perPage ? `perPage=${perPage}` : undefined
  let allParam = [pageParam, perPageParam].filter(e => e).join('&')
  if (allParam) allParam = `?${allParam}`
  const url = `${baseUrl}api/category${allParam}`
  return dispatch(fetchIndex(url, null, null, categoryListsType))
}

export const categoryAllIndex = () => dispatch => {
  const url = `${baseUrl}api/category/all`
  return dispatch(fetchIndex(url, null, null, categoryListsType))
}

const categoryDetailType = [
  CATEGORY_DETAIL,
  CATEGORY_DETAIL_SUCCESS,
  CATEGORY_DETAIL_FAIL,
]

export const categoryDetail = ({ id }) => dispatch => {
  const url = `${baseUrl}api/category/${id}`
  return dispatch(fetchIndex(url, null, null, categoryDetailType))
}

const categorySaveType = [
  CATEGORY_SAVE,
  CATEGORY_SAVE_SUCCESS,
  CATEGORY_SAVE_FAIL,
]

export const categorySave = param => dispatch => {
  const data = {
    ...param,
  }
  const url = `${baseUrl}api/category`
  return dispatch(fetchPost(url, null, data, categorySaveType))
}

const categoryUpdateType = [
  CATEGORY_UPDATE,
  CATEGORY_UPDATE_SUCCESS,
  CATEGORY_UPDATE_FAIL,
]

export const categoryUpdate = ({ id, ...param }) => dispatch => {
  const data = {
    ...param,
  }
  const url = `${baseUrl}api/category/${id}`
  return dispatch(fetchPatch(url, null, data, categoryUpdateType))
}

const categoryDeleteListType = [
  CATEGORY_DELETE_LIST,
  CATEGORY_DELETE_LIST_SUCCESS,
  CATEGORY_DELETE_LIST_FAIL,
]

export const categoryDeleteList = ({ id }) => dispatch => {
  const url = `${baseUrl}api/category/${id}`
  return dispatch(fetchDelete(url, null, null, categoryDeleteListType))
}

const categoryDeleteType = [
  CATEGORY_DELETE,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_FAIL,
]

export const categoryDelete = ({ id }) => dispatch => {
  const url = `${baseUrl}api/category/${id}`
  return dispatch(fetchDelete(url, null, null, categoryDeleteType))
}

export const categoryCleanFail = () => dispatch => {
  return dispatch({
    type: CATEGORY_CLEAN_FAIL,
  })
}

export const categoryCleanSuccess = () => dispatch => {
  return dispatch({
    type: CATEGORY_CLEAN_SUCCESS,
  })
}

export default null
