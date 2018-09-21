import baseUrl from '../constants/url'
import {
  fetchIndex,
  fetchPost,
  fetchPatch,
  fetchDelete,
  fetchDownload,
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
  STOCK_REPORT_LIST,
  STOCK_REPORT_LIST_FAIL,
  STOCK_REPORT_LIST_SUCCESS,
  STOCK_REPORT_DETAIL,
  STOCK_REPORT_DETAIL_FAIL,
  STOCK_REPORT_DETAIL_SUCCESS,
} from '../constants/stock'

const stockListsType = [
  STOCK_LIST,
  STOCK_LIST_SUCCESS,
  STOCK_LIST_FAIL,
]

export const stockIndex = (page, perPage, param) => dispatch => {
  const pageParam = page ? `page=${page}` : undefined
  const perPageParam = perPage ? `perPage=${perPage}` : undefined
  let allParam = [pageParam, perPageParam].filter(e => e).join('&')
  if (allParam) allParam = `?${allParam}`
  const url = `${baseUrl}api/stock${allParam}`
  return dispatch(fetchPost(url, null, param, stockListsType))
}

export const stockLowIndex = () => dispatch => {
  const url = `${baseUrl}api/stock/low`
  return dispatch(fetchIndex(url, null, null, stockListsType))
}

const stockReportListsType = [
  STOCK_REPORT_LIST,
  STOCK_REPORT_LIST_SUCCESS,
  STOCK_REPORT_LIST_FAIL,
]

export const stockReport = param => dispatch => {
  const data = {
    ...param,
  }
  const url = `${baseUrl}api/stock/report`
  return dispatch(fetchDownload(url, null, data, stockReportListsType))
}

const stockReportDetailType = [
  STOCK_REPORT_DETAIL,
  STOCK_REPORT_DETAIL_SUCCESS,
  STOCK_REPORT_DETAIL_FAIL,
]

export const stockReportDetail = param => dispatch => {
  const data = {
    ...param,
  }
  const url = `${baseUrl}api/stock-detail/report`
  return dispatch(fetchDownload(url, null, data, stockReportDetailType))
}

const stockDetailType = [
  STOCK_DETAIL,
  STOCK_DETAIL_SUCCESS,
  STOCK_DETAIL_FAIL,
]

export const stockDetail = (page, perPage, param) => dispatch => {
  const pageParam = page ? `page=${page}` : undefined
  const perPageParam = perPage ? `perPage=${perPage}` : undefined
  let allParam = [pageParam, perPageParam].filter(e => e).join('&')
  if (allParam) allParam = `?${allParam}`
  const url = `${baseUrl}api/stock-detail${allParam}`
  return dispatch(fetchPost(url, null, param, stockDetailType))
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
