import _ from 'lodash'

import {
  USER_LIST_SUCCESS,
  USER_LIST,
  USER_LIST_FAIL,
  USER_DELETE_LIST,
  USER_DELETE_LIST_SUCCESS,
  USER_DELETE_LIST_FAIL,
  USER_CLEAN_FAIL,
  USER_CLEAN_SUCCESS,
} from '../../constants/user'

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
    case USER_LIST:
      return Object.assign({}, state, initialState, { onLoading: true })
    case USER_LIST_SUCCESS:
      return Object.assign({}, state, { data: payload.data, onLoading: false })
    case USER_LIST_FAIL:
    case USER_DELETE_LIST_FAIL:
      return Object.assign(
        {},
        state,
        {
          onError: true,
          onLoading: false,
          errorMessage: payload ? payload.data : error.response.data,
        },
      )
    case USER_DELETE_LIST_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          onSuccess: true,
          onLoading: false,
          successMessage: 'Data has been deleted successfully.',
        },
      )
    case USER_DELETE_LIST:
    case USER_CLEAN_FAIL:
      return Object.assign({}, state, initialState, { data: state.data, onLoading: true })
    case USER_CLEAN_SUCCESS:
      return Object.assign({}, state, initialState, { data: state.data, onLoading: false })
    default:
      return state
  }
}

export default defaultState
