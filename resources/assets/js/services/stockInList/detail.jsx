import _ from 'lodash'

import {
  STOCK_IN_DETAIL_SUCCESS,
  STOCK_IN_DETAIL,
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
  STOCK_IN_CLEAN_FAIL,
  STOCK_IN_CLEAN_SUCCESS,
} from '../../constants/stockIn'

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
    case STOCK_IN_DETAIL:
      return Object.assign({}, state, initialState)
    case STOCK_IN_DETAIL_SUCCESS:
      return Object.assign({}, state, { data: payload.data })
    case STOCK_IN_SAVE_FAIL:
    case STOCK_IN_DETAIL_FAIL:
    case STOCK_IN_UPDATE_FAIL:
    case STOCK_IN_DELETE_FAIL:
      return Object.assign(
        {},
        state,
        {
          onError: true,
          errorMessage: payload ? payload.data : error.response.data,
        },
      )
    case STOCK_IN_SAVE_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          data: payload.data,
          onSuccess: true,
          successMessage: 'Data has been inserted successfully.',
        },
      )
    case STOCK_IN_UPDATE_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          data: payload.data,
          onSuccess: true,
          successMessage: 'Data has been updated successfully.',
        },
      )
    case STOCK_IN_DELETE_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          data: initialState.data,
          onSuccess: true,
          successMessage: 'Data has been deleted successfully.',
        },
      )
    case STOCK_IN_SAVE:
    case STOCK_IN_UPDATE:
    case STOCK_IN_DELETE:
    case STOCK_IN_CLEAN_FAIL:
    case STOCK_IN_CLEAN_SUCCESS:
      return Object.assign({}, state, initialState, { data: state.data })
    default:
      return state
  }
}

export default defaultState
