import baseUrl from '../constants/url'
import {
  fetchIndex,
  fetchPost,
  fetchPatch,
  fetchDelete,
} from '../actions/fetch'
import {
  USER_LIST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_DETAIL,
  USER_DETAIL_SUCCESS,
  USER_DETAIL_FAIL,
  USER_SAVE,
  USER_SAVE_SUCCESS,
  USER_SAVE_FAIL,
  USER_UPDATE,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_DELETE,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_LIST,
  USER_DELETE_LIST_SUCCESS,
  USER_DELETE_LIST_FAIL,
  USER_CLEAN_FAIL,
  USER_CLEAN_SUCCESS,
} from '../constants/user'

const userListsType = [
  USER_LIST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
]

export const userIndex = (page, perPage, param) => dispatch => {
  const pageParam = page ? `page=${page}` : undefined
  const perPageParam = perPage ? `perPage=${perPage}` : undefined
  let allParam = [pageParam, perPageParam].filter(e => e).join('&')
  if (allParam) allParam = `?${allParam}`
  const url = `${baseUrl}api/user/index${allParam}`
  return dispatch(fetchPost(url, null, param, userListsType))
}

export const userAllIndex = () => dispatch => {
  const url = `${baseUrl}api/user/all`
  return dispatch(fetchIndex(url, null, null, userListsType))
}

const userDetailType = [
  USER_DETAIL,
  USER_DETAIL_SUCCESS,
  USER_DETAIL_FAIL,
]

export const userDetail = ({ id }) => dispatch => {
  const url = `${baseUrl}api/user/${id}`
  return dispatch(fetchIndex(url, null, null, userDetailType))
}

const userSaveType = [
  USER_SAVE,
  USER_SAVE_SUCCESS,
  USER_SAVE_FAIL,
]

export const userSave = param => dispatch => {
  const data = {
    ...param,
  }
  const url = `${baseUrl}api/user`
  return dispatch(fetchPost(url, null, data, userSaveType))
}

const userUpdateType = [
  USER_UPDATE,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
]

export const userUpdate = ({ id, ...param }) => dispatch => {
  const data = {
    ...param,
  }
  const url = `${baseUrl}api/user/${id}`
  return dispatch(fetchPatch(url, null, data, userUpdateType))
}

const userDeleteListType = [
  USER_DELETE_LIST,
  USER_DELETE_LIST_SUCCESS,
  USER_DELETE_LIST_FAIL,
]

export const userDeleteList = ({ id }) => dispatch => {
  const url = `${baseUrl}api/user/${id}`
  return dispatch(fetchDelete(url, null, null, userDeleteListType))
}

const userDeleteType = [
  USER_DELETE,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
]

export const userDelete = ({ id }) => dispatch => {
  const url = `${baseUrl}api/user/${id}`
  return dispatch(fetchDelete(url, null, null, userDeleteType))
}

export const userCleanFail = () => dispatch => {
  return dispatch({
    type: USER_CLEAN_FAIL,
  })
}

export const userCleanSuccess = () => dispatch => {
  return dispatch({
    type: USER_CLEAN_SUCCESS,
  })
}

export default null
