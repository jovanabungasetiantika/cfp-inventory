import _ from 'lodash'

import {
  USER_DETAIL_SUCCESS,
  USER_DETAIL,
  USER_DETAIL_FAIL,
  USER_SAVE,
  USER_SAVE_SUCCESS,
  USER_SAVE_FAIL,
  USER_UPDATE,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_DELETE,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
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
    case USER_DETAIL:
      return Object.assign({}, state, initialState, { onLoading: true })
    case USER_DETAIL_SUCCESS:
      return Object.assign({}, state, { data: payload.data, onLoading: false })
    case USER_SAVE_FAIL:
    case USER_DETAIL_FAIL:
    case USER_UPDATE_FAIL:
    case USER_DELETE_FAIL:
      return Object.assign(
        {},
        state,
        {
          onError: true,
          onLoading: false,
          errorMessage: payload ? payload.data : error.response.data,
        },
      )
    case USER_SAVE_SUCCESS:
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
    case USER_UPDATE_SUCCESS:
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
    case USER_DELETE_SUCCESS:
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
    case USER_SAVE:
    case USER_UPDATE:
    case USER_DELETE:
      return Object.assign({}, state, initialState, { data: state.data, onLoading: true })
    case USER_CLEAN_FAIL:
    case USER_CLEAN_SUCCESS:
      return Object.assign({}, state, initialState, { data: state.data, onLoading: false })
    default:
      return state
  }
}

export default defaultState
