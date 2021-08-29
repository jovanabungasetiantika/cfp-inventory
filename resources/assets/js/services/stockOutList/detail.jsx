import _ from 'lodash'

import {
  STOCK_OUT_DETAIL_SUCCESS,
  STOCK_OUT_DETAIL,
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
    case STOCK_OUT_DETAIL:
      return Object.assign({}, state, initialState, { onLoading: true })
    case STOCK_OUT_DETAIL_SUCCESS:
      return Object.assign({}, state, { data: payload.data, onLoading: false })
    case STOCK_OUT_SAVE_FAIL:
    case STOCK_OUT_DETAIL_FAIL:
    case STOCK_OUT_UPDATE_FAIL:
    case STOCK_OUT_DELETE_FAIL:
      return Object.assign(
        {},
        state,
        {
          onError: true,
          onLoading: false,
          errorMessage: payload ? payload.data : error.response.data,
        },
      )
    case STOCK_OUT_SAVE_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          data: payload.data,
          onSuccess: true,
          onLoading: false,
          successMessage: 'Data has been inserted successfully.',
        },
      )
    case STOCK_OUT_UPDATE_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          data: payload.data,
          onSuccess: true,
          onLoading: false,
          successMessage: 'Data has been updated successfully.',
        },
      )
    case STOCK_OUT_DELETE_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          data: initialState.data,
          onSuccess: true,
          onLoading: false,
          successMessage: 'Data has been deleted successfully.',
        },
      )
    case STOCK_OUT_SAVE:
    case STOCK_OUT_UPDATE:
    case STOCK_OUT_DELETE:
      return Object.assign({}, state, initialState, { data: state.data, onLoading: true })
    case STOCK_OUT_CLEAN_FAIL:
    case STOCK_OUT_CLEAN_SUCCESS:
      return Object.assign({}, state, initialState, { data: state.data, onLoading: false })
    default:
      return state
  }
}

export default defaultState
