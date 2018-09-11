import _ from 'lodash'

import {
  STOCK_LIST_SUCCESS,
  STOCK_LIST,
  STOCK_LIST_FAIL,
  STOCK_DELETE_LIST,
  STOCK_DELETE_LIST_SUCCESS,
  STOCK_DELETE_LIST_FAIL,
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
    case STOCK_LIST:
      return Object.assign({}, state, initialState)
    case STOCK_LIST_SUCCESS:
      return Object.assign({}, state, { data: payload.data })
    case STOCK_LIST_FAIL:
    case STOCK_DELETE_LIST_FAIL:
      return Object.assign(
        {},
        state,
        {
          onError: true,
          errorMessage: payload ? payload.data : error.response.data,
        },
      )
    case STOCK_DELETE_LIST_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          onSuccess: true,
          successMessage: 'Data has been deleted successfully.',
        },
      )
    case STOCK_DELETE_LIST:
    case STOCK_CLEAN_FAIL:
    case STOCK_CLEAN_SUCCESS:
      return Object.assign({}, state, initialState, { data: state.data })
    default:
      return state
  }
}

export default defaultState
