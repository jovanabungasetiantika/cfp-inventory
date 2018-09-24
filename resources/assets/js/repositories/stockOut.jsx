import baseUrl from '../constants/url'
import {
  fetchIndex,
  fetchPost,
  fetchPatch,
  fetchDelete,
  fetchDownload,
} from '../actions/fetch'
import {
  STOCK_OUT_LIST,
  STOCK_OUT_LIST_SUCCESS,
  STOCK_OUT_LIST_FAIL,
  STOCK_OUT_DETAIL,
  STOCK_OUT_DETAIL_SUCCESS,
  STOCK_OUT_DETAIL_FAIL,
  STOCK_OUT_SAVE,
  STOCK_OUT_SAVE_SUCCESS,
  STOCK_OUT_SAVE_FAIL,
  STOCK_OUT_UPDATE,
  STOCK_OUT_UPDATE_SUCCESS,
  STOCK_OUT_UPDATE_FAIL,
  STOCK_OUT_DELETE,
  STOCK_OUT_DELETE_SUCCESS,
  STOCK_OUT_DELETE_FAIL,
  STOCK_OUT_DELETE_LIST,
  STOCK_OUT_DELETE_LIST_SUCCESS,
  STOCK_OUT_DELETE_LIST_FAIL,
  STOCK_OUT_REPORT,
  STOCK_OUT_REPORT_SUCCESS,
  STOCK_OUT_REPORT_FAIL,
  STOCK_OUT_CLEAN_FAIL,
  STOCK_OUT_CLEAN_SUCCESS,
} from '../constants/stockOut'

const stockOutListsType = [
  STOCK_OUT_LIST,
  STOCK_OUT_LIST_SUCCESS,
  STOCK_OUT_LIST_FAIL,
]

export const stockOutIndex = (page, perPage, param) => dispatch => {
  const pageParam = page ? `page=${page}` : undefined
  const perPageParam = perPage ? `perPage=${perPage}` : undefined
  let allParam = [pageParam, perPageParam].filter(e => e).join('&')
  if (allParam) allParam = `?${allParam}`
  const url = `${baseUrl}api/stock-out/index${allParam}`
  return dispatch(fetchPost(url, null, param, stockOutListsType))
}

export const stockOutIndexReport = (page, perPage, param) => dispatch => {
  const pageParam = page ? `page=${page}` : undefined
  const perPageParam = perPage ? `perPage=${perPage}` : undefined
  let allParam = [pageParam, perPageParam].filter(e => e).join('&')
  if (allParam) allParam = `?${allParam}`
  const url = `${baseUrl}api/stock-out/report-index${allParam}`
  return dispatch(fetchPost(url, null, param, stockOutListsType))
}

const stockOutReportType = [
  STOCK_OUT_REPORT,
  STOCK_OUT_REPORT_SUCCESS,
  STOCK_OUT_REPORT_FAIL,
]

export const stockOutReport = param => dispatch => {
  const data = {
    ...param,
  }
  const url = `${baseUrl}api/stock-out/report`
  return dispatch(fetchDownload(url, null, data, stockOutReportType))
}

const stockOutDetailType = [
  STOCK_OUT_DETAIL,
  STOCK_OUT_DETAIL_SUCCESS,
  STOCK_OUT_DETAIL_FAIL,
]

export const stockOutDetail = ({ id }) => dispatch => {
  const url = `${baseUrl}api/stock-out/${id}`
  return dispatch(fetchIndex(url, null, null, stockOutDetailType))
}

const stockOutSaveType = [
  STOCK_OUT_SAVE,
  STOCK_OUT_SAVE_SUCCESS,
  STOCK_OUT_SAVE_FAIL,
]

export const stockOutSave = param => dispatch => {
  const data = {
    ...param,
  }
  const url = `${baseUrl}api/stock-out`
  return dispatch(fetchPost(url, null, data, stockOutSaveType))
}

const stockOutUpdateType = [
  STOCK_OUT_UPDATE,
  STOCK_OUT_UPDATE_SUCCESS,
  STOCK_OUT_UPDATE_FAIL,
]

export const stockOutUpdate = ({ id, ...param }) => dispatch => {
  const data = {
    ...param,
  }
  const url = `${baseUrl}api/stock-out/${id}`
  return dispatch(fetchPatch(url, null, data, stockOutUpdateType))
}

const stockOutDeleteListType = [
  STOCK_OUT_DELETE_LIST,
  STOCK_OUT_DELETE_LIST_SUCCESS,
  STOCK_OUT_DELETE_LIST_FAIL,
]

export const stockOutDeleteList = ({ id }) => dispatch => {
  const url = `${baseUrl}api/stock-out/${id}`
  return dispatch(fetchDelete(url, null, null, stockOutDeleteListType))
}

const stockOutDeleteType = [
  STOCK_OUT_DELETE,
  STOCK_OUT_DELETE_SUCCESS,
  STOCK_OUT_DELETE_FAIL,
]

export const stockOutDelete = ({ id }) => dispatch => {
  const url = `${baseUrl}api/stock-out/${id}`
  return dispatch(fetchDelete(url, null, null, stockOutDeleteType))
}

export const stockOutCleanFail = () => dispatch => {
  return dispatch({
    type: STOCK_OUT_CLEAN_FAIL,
  })
}

export const stockOutCleanSuccess = () => dispatch => {
  return dispatch({
    type: STOCK_OUT_CLEAN_SUCCESS,
  })
}

export default null
