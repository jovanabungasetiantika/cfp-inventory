import _ from 'lodash'

import {
  STOCK_OUT_LIST_SUCCESS,
  STOCK_OUT_LIST,
  STOCK_OUT_LIST_FAIL,
  STOCK_OUT_DELETE_LIST,
  STOCK_OUT_DELETE_LIST_SUCCESS,
  STOCK_OUT_DELETE_LIST_FAIL,
  STOCK_OUT_REPORT,
  STOCK_OUT_REPORT_SUCCESS,
  STOCK_OUT_REPORT_FAIL,
  STOCK_OUT_CLEAN_FAIL,
  STOCK_OUT_CLEAN_SUCCESS,
} from '../../constants/stockOut'

const initialState = {
  data: null,
  onLoading: false,
  onError: false,
  onSuccess: false,
  errorMessage: null,
  successMessage: null,
}

const defaultState = (state = initialState, { type, payload, error }) => {
  let tempData
  let tempIdx
  switch (type) {
    case STOCK_OUT_LIST:
      return Object.assign({}, state, initialState, { onLoading: true })
    case STOCK_OUT_REPORT:
      return Object.assign({}, state, { onLoading: true, onSuccess: false, onError: false })
    case STOCK_OUT_LIST_SUCCESS:
      return Object.assign({}, state, { data: payload.data, onLoading: false })
    case STOCK_OUT_LIST_FAIL:
    case STOCK_OUT_REPORT_FAIL:
    case STOCK_OUT_DELETE_LIST_FAIL:
      return Object.assign(
        {},
        state,
        {
          onError: true,
          onLoading: false,
          errorMessage: payload ? payload.data : error.response.data,
        },
      )
    case STOCK_OUT_REPORT_SUCCESS:
      const blob = new Blob([payload.data], { type: payload.data.type });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const contentDisposition = payload.headers['content-disposition'];
      let fileName = 'unknown';
      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
        if (fileNameMatch.length === 2)
          fileName = fileNameMatch[1];
      }
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      return Object.assign(
        {},
        state,
        {
          onSuccess: true,
          onLoading: false,
          successMessage: 'Report generated successfully.',
        },
      )
    case STOCK_OUT_DELETE_LIST_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          onSuccess: true,
          onLoading: false,
          successMessage: 'Data has been deleted successfully.',
        },
      )
    case STOCK_OUT_DELETE_LIST:
    case STOCK_OUT_CLEAN_FAIL:
      return Object.assign({}, state, initialState, { data: state.data, onLoading: true })
    case STOCK_OUT_CLEAN_SUCCESS:
      return Object.assign({}, state, initialState, { data: state.data, onLoading: false })
    default:
      return state
  }
}

export default defaultState
