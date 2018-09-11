import _ from 'lodash'

import {
  STOCK_DETAIL_SUCCESS,
  STOCK_DETAIL,
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
    case STOCK_SAVE_FAIL:
    case STOCK_DETAIL_FAIL:
    case STOCK_UPDATE_FAIL:
    case STOCK_DELETE_FAIL:
      return Object.assign(
        {},
        state,
        {
          onError: true,
          errorMessage: payload ? payload.data : error.response.data,
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
