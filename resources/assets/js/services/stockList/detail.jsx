import _ from 'lodash'

import {
  STOCK_DETAIL_SUCCESS,
  STOCK_DETAIL,
  STOCK_DETAIL_FAIL,
  STOCK_REPORT_DETAIL,
  STOCK_REPORT_DETAIL_SUCCESS,
  STOCK_REPORT_DETAIL_FAIL,
  STOCK_SAVE,
  STOCK_SAVE_SUCCESS,
  STOCK_SAVE_FAIL,
  STOCK_UPDATE,
  STOCK_UPDATE_SUCCESS,
  STOCK_UPDATE_FAIL,
  STOCK_DELETE,
  STOCK_DELETE_SUCCESS,
  STOCK_DELETE_FAIL,
  STOCK_CLEAN_FAIL,
  STOCK_CLEAN_SUCCESS,
} from '../../constants/stock'

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
    case STOCK_DETAIL:
      return Object.assign({}, state, initialState)
    case STOCK_DETAIL_SUCCESS:
      return Object.assign({}, state, { data: payload.data })
    case STOCK_REPORT_DETAIL:
      return Object.assign({}, state, { onLoading: true, onSuccess: false, onError: false })
    case STOCK_SAVE_FAIL:
    case STOCK_REPORT_DETAIL_FAIL:
    case STOCK_DETAIL_FAIL:
    case STOCK_UPDATE_FAIL:
    case STOCK_DELETE_FAIL:
      return Object.assign(
        {},
        state,
        {
          onError: true,
          onLoading: false,
          errorMessage: payload ? payload.data : error.response.data,
        },
      )
    case STOCK_REPORT_DETAIL_SUCCESS:
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
    case STOCK_SAVE_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          data: payload.data,
          onSuccess: true,
          successMessage: 'Data has been inserted successfully.',
        },
      )
    case STOCK_UPDATE_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          data: payload.data,
          onSuccess: true,
          successMessage: 'Data has been updated successfully.',
        },
      )
    case STOCK_DELETE_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          data: initialState.data,
          onSuccess: true,
          successMessage: 'Data has been deleted successfully.',
        },
      )
    case STOCK_SAVE:
    case STOCK_UPDATE:
    case STOCK_DELETE:
    case STOCK_CLEAN_FAIL:
    case STOCK_CLEAN_SUCCESS:
      return Object.assign({}, state, initialState, { data: state.data })
    default:
      return state
  }
}

export default defaultState
