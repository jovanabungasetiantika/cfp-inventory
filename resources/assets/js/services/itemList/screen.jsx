import _ from 'lodash'

import {
  ITEM_LIST_SUCCESS,
  ITEM_LIST,
  ITEM_LIST_FAIL,
  ITEM_DELETE_LIST,
  ITEM_DELETE_LIST_SUCCESS,
  ITEM_DELETE_LIST_FAIL,
  ITEM_CLEAN_FAIL,
  ITEM_CLEAN_SUCCESS,
} from '../../constants/item'

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
    case ITEM_LIST:
      return Object.assign({}, state, initialState, { onLoading: true })
    case ITEM_LIST_SUCCESS:
      return Object.assign({}, state, { data: payload.data, onLoading: false })
    case ITEM_LIST_FAIL:
    case ITEM_DELETE_LIST_FAIL:
      return Object.assign(
        {},
        state,
        {
          onError: true,
          onLoading: false,
          errorMessage: payload ? payload.data : error.response.data,
        },
      )
    case ITEM_DELETE_LIST_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          onSuccess: true,
          onLoading: false,
          successMessage: 'Data has been deleted successfully.',
        },
      )
    case ITEM_DELETE_LIST:
      case ITEM_CLEAN_FAIL:
      return Object.assign({}, state, initialState, { data: state.data, onLoading: true })
    case ITEM_CLEAN_SUCCESS:
      return Object.assign({}, state, initialState, { data: state.data, onLoading: false })
    default:
      return state
  }
}

export default defaultState
