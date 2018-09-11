import baseUrl from '../constants/url'
import {
  fetchIndex,
  fetchPost,
  fetchPatch,
  fetchDelete,
} from '../actions/fetch'
import {
  STOCK_LIST,
  STOCK_LIST_SUCCESS,
  STOCK_LIST_FAIL,
  STOCK_DETAIL,
  STOCK_DETAIL_SUCCESS,
  STOCK_DETAIL_FAIL,
  STOCK_SAVE,
  STOCK_SAVE_SUCCESS,
  STOCK_SAVE_FAIL,
  STOCK_UPDATE,
  STOCK_UPDATE_SUCCESS,
  STOCK_UPDATE_FAIL,
  STOCK_DELETE,
  STOCK_DELETE_SUCCESS,
  STOCK_DELETE_FAIL,
  STOCK_DELETE_LIST,
  STOCK_DELETE_LIST_SUCCESS,
  STOCK_DELETE_LIST_FAIL,
  STOCK_CLEAN_FAIL,
  STOCK_CLEAN_SUCCESS,
} from '../constants/stock'

const stockListsType = [
  STOCK_LIST,
  STOCK_LIST_SUCCESS,
  STOCK_LIST_FAIL,
]

export const stockIndex = _ => dispatch => {
  const url = `${baseUrl}api/stock`
  return dispatch(fetchIndex(url, null, null, stockListsType))
}

const stockDetailType = [
  STOCK_DETAIL,
  STOCK_DETAIL_SUCCESS,
  STOCK_DETAIL_FAIL,
]

export const stockDetail = ({ id }) => dispatch => {
  const url = `${baseUrl}api/stock/${id}`
  return dispatch(fetchIndex(url, null, null, stockDetailType))
}

const stockSaveType = [
  STOCK_SAVE,
  STOCK_SAVE_SUCCESS,
  STOCK_SAVE_FAIL,
]

export const stockSave = param => dispatch => {
  const data = {
    ...param,
  }
  const url = `${baseUrl}api/stock`
  return dispatch(fetchPost(url, null, data, stockSaveType))
}

const stockUpdateType = [
  STOCK_UPDATE,
  STOCK_UPDATE_SUCCESS,
  STOCK_UPDATE_FAIL,
]

export const stockUpdate = ({ id, ...param }) => dispatch => {
  const data = {
    ...param,
  }
  const url = `${baseUrl}api/stock/${id}`
  return dispatch(fetchPatch(url, null, data, stockUpdateType))
}

const stockDeleteListType = [
  STOCK_DELETE_LIST,
  STOCK_DELETE_LIST_SUCCESS,
  STOCK_DELETE_LIST_FAIL,
]

export const stockDeleteList = ({ id }) => dispatch => {
  const url = `${baseUrl}api/stock/${id}`
  return dispatch(fetchDelete(url, null, null, stockDeleteListType))
}

const stockDeleteType = [
  STOCK_DELETE,
  STOCK_DELETE_SUCCESS,
  STOCK_DELETE_FAIL,
]

export const stockDelete = ({ id }) => dispatch => {
  const url = `${baseUrl}api/stock/${id}`
  return dispatch(fetchDelete(url, null, null, stockDeleteType))
}

export const stockCleanFail = () => dispatch => {
  return dispatch({
    type: STOCK_CLEAN_FAIL,
  })
}

export const stockCleanSuccess = () => dispatch => {
  return dispatch({
    type: STOCK_CLEAN_SUCCESS,
  })
}

export default null
