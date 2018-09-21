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
      return Object.assign({}, state, initialState)
    case ITEM_LIST_SUCCESS:
      return Object.assign({}, state, { data: payload.data })
    case ITEM_LIST_FAIL:
    case ITEM_DELETE_LIST_FAIL:
      return Object.assign(
        {},
        state,
        {
          onError: true,
          errorMessage: payload ? payload.data : error.response.data,
        },
      )
    case ITEM_DELETE_LIST_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          onSuccess: true,
          successMessage: 'Data has been deleted successfully.',
        },
      )
    case ITEM_DELETE_LIST:
    case ITEM_CLEAN_FAIL:
    case ITEM_CLEAN_SUCCESS:
      return Object.assign({}, state, initialState, { data: state.data })
    default:
      return state
  }
}

export default defaultState
