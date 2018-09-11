import baseUrl from '../constants/url'
import {
  fetchIndex,
  fetchPost,
  fetchPatch,
  fetchDelete,
} from '../actions/fetch'
import {
  STOCK_IN_LIST,
  STOCK_IN_LIST_SUCCESS,
  STOCK_IN_LIST_FAIL,
  STOCK_IN_DETAIL,
  STOCK_IN_DETAIL_SUCCESS,
  STOCK_IN_DETAIL_FAIL,
  STOCK_IN_SAVE,
  STOCK_IN_SAVE_SUCCESS,
  STOCK_IN_SAVE_FAIL,
  STOCK_IN_UPDATE,
  STOCK_IN_UPDATE_SUCCESS,
  STOCK_IN_UPDATE_FAIL,
  STOCK_IN_DELETE,
  STOCK_IN_DELETE_SUCCESS,
  STOCK_IN_DELETE_FAIL,
  STOCK_IN_DELETE_LIST,
  STOCK_IN_DELETE_LIST_SUCCESS,
  STOCK_IN_DELETE_LIST_FAIL,
  STOCK_IN_CLEAN_FAIL,
  STOCK_IN_CLEAN_SUCCESS,
} from '../constants/stockIn'

const stockInListsType = [
  STOCK_IN_LIST,
  STOCK_IN_LIST_SUCCESS,
  STOCK_IN_LIST_FAIL,
]

export const stockInIndex = _ => dispatch => {
  const url = `${baseUrl}api/stock-in`
  return dispatch(fetchIndex(url, null, null, stockInListsType))
}

const stockInDetailType = [
  STOCK_IN_DETAIL,
  STOCK_IN_DETAIL_SUCCESS,
  STOCK_IN_DETAIL_FAIL,
]

export const stockInDetail = ({ id }) => dispatch => {
  const url = `${baseUrl}api/stock-in/${id}`
  return dispatch(fetchIndex(url, null, null, stockInDetailType))
}

const stockInSaveType = [
  STOCK_IN_SAVE,
  STOCK_IN_SAVE_SUCCESS,
  STOCK_IN_SAVE_FAIL,
]

export const stockInSave = param => dispatch => {
  const data = {
    ...param,
  }
  const url = `${baseUrl}api/stock-in`
  return dispatch(fetchPost(url, null, data, stockInSaveType))
}

const stockInUpdateType = [
  STOCK_IN_UPDATE,
  STOCK_IN_UPDATE_SUCCESS,
  STOCK_IN_UPDATE_FAIL,
]

export const stockInUpdate = ({ id, ...param }) => dispatch => {
  const data = {
    ...param,
  }
  const url = `${baseUrl}api/stock-in/${id}`
  return dispatch(fetchPatch(url, null, data, stockInUpdateType))
}

const stockInDeleteListType = [
  STOCK_IN_DELETE_LIST,
  STOCK_IN_DELETE_LIST_SUCCESS,
  STOCK_IN_DELETE_LIST_FAIL,
]

export const stockInDeleteList = ({ id }) => dispatch => {
  const url = `${baseUrl}api/stock-in/${id}`
  return dispatch(fetchDelete(url, null, null, stockInDeleteListType))
}

const stockInDeleteType = [
  STOCK_IN_DELETE,
  STOCK_IN_DELETE_SUCCESS,
  STOCK_IN_DELETE_FAIL,
]

export const stockInDelete = ({ id }) => dispatch => {
  const url = `${baseUrl}api/stock-in/${id}`
  return dispatch(fetchDelete(url, null, null, stockInDeleteType))
}

export const stockInCleanFail = () => dispatch => {
  return dispatch({
    type: STOCK_IN_CLEAN_FAIL,
  })
}

export const stockInCleanSuccess = () => dispatch => {
  return dispatch({
    type: STOCK_IN_CLEAN_SUCCESS,
  })
}

export default null
