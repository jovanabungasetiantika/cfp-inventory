import baseUrl from '../constants/url'
import {
  fetchIndex,
  fetchPost,
  fetchPatch,
  fetchDelete,
} from '../actions/fetch'
import {
  ITEM_LIST,
  ITEM_LIST_SUCCESS,
  ITEM_LIST_FAIL,
  ITEM_DETAIL,
  ITEM_DETAIL_SUCCESS,
  ITEM_DETAIL_FAIL,
  ITEM_SAVE,
  ITEM_SAVE_SUCCESS,
  ITEM_SAVE_FAIL,
  ITEM_UPDATE,
  ITEM_UPDATE_SUCCESS,
  ITEM_UPDATE_FAIL,
  ITEM_DELETE,
  ITEM_DELETE_SUCCESS,
  ITEM_DELETE_FAIL,
  ITEM_DELETE_LIST,
  ITEM_DELETE_LIST_SUCCESS,
  ITEM_DELETE_LIST_FAIL,
  ITEM_CLEAN_FAIL,
  ITEM_CLEAN_SUCCESS,
} from '../constants/item'

const itemListsType = [
  ITEM_LIST,
  ITEM_LIST_SUCCESS,
  ITEM_LIST_FAIL,
]

export const itemIndex = (page, perPage, param) => dispatch => {
  const pageParam = page ? `page=${page}` : undefined
  const perPageParam = perPage ? `perPage=${perPage}` : undefined
  let allParam = [pageParam, perPageParam].filter(e => e).join('&')
  if (allParam) allParam = `?${allParam}`
  const url = `${baseUrl}api/item/index${allParam}`
  return dispatch(fetchPost(url, null, param, itemListsType))
}

export const itemAllIndex = () => dispatch => {
  const url = `${baseUrl}api/item/all`
  return dispatch(fetchIndex(url, null, null, itemListsType))
}

const itemDetailType = [
  ITEM_DETAIL,
  ITEM_DETAIL_SUCCESS,
  ITEM_DETAIL_FAIL,
]

export const itemDetail = ({ id }) => dispatch => {
  const url = `${baseUrl}api/item/${id}`
  return dispatch(fetchIndex(url, null, null, itemDetailType))
}

const itemSaveType = [
  ITEM_SAVE,
  ITEM_SAVE_SUCCESS,
  ITEM_SAVE_FAIL,
]

export const itemSave = param => dispatch => {
  const data = {
    ...param,
  }
  const url = `${baseUrl}api/item`
  return dispatch(fetchPost(url, null, data, itemSaveType))
}

const itemUpdateType = [
  ITEM_UPDATE,
  ITEM_UPDATE_SUCCESS,
  ITEM_UPDATE_FAIL,
]

export const itemUpdate = ({ id, ...param }) => dispatch => {
  const data = {
    ...param,
  }
  const url = `${baseUrl}api/item/${id}`
  return dispatch(fetchPatch(url, null, data, itemUpdateType))
}

const itemDeleteListType = [
  ITEM_DELETE_LIST,
  ITEM_DELETE_LIST_SUCCESS,
  ITEM_DELETE_LIST_FAIL,
]

export const itemDeleteList = ({ id }) => dispatch => {
  const url = `${baseUrl}api/item/${id}`
  return dispatch(fetchDelete(url, null, null, itemDeleteListType))
}

const itemDeleteType = [
  ITEM_DELETE,
  ITEM_DELETE_SUCCESS,
  ITEM_DELETE_FAIL,
]

export const itemDelete = ({ id }) => dispatch => {
  const url = `${baseUrl}api/item/${id}`
  return dispatch(fetchDelete(url, null, null, itemDeleteType))
}

export const itemCleanFail = () => dispatch => {
  return dispatch({
    type: ITEM_CLEAN_FAIL,
  })
}

export const itemCleanSuccess = () => dispatch => {
  return dispatch({
    type: ITEM_CLEAN_SUCCESS,
  })
}

export default null
