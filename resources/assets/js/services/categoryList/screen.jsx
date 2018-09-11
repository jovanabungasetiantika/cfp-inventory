import _ from 'lodash'

import {
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST,
  CATEGORY_LIST_FAIL,
  CATEGORY_SAVE,
  CATEGORY_SAVE_SUCCESS,
  CATEGORY_SAVE_FAIL,
  CATEGORY_UPDATE,
  CATEGORY_UPDATE_SUCCESS,
  CATEGORY_UPDATE_FAIL,
  CATEGORY_DELETE_LIST,
  CATEGORY_DELETE_LIST_SUCCESS,
  CATEGORY_DELETE_LIST_FAIL,
  CATEGORY_CLEAN_FAIL,
  CATEGORY_CLEAN_SUCCESS,
} from '../../constants/category'

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
    case CATEGORY_LIST:
      return Object.assign({}, state, initialState, {
        onSuccess: state.onSuccess,
        successMessage: state.successMessage,
      })
    case CATEGORY_LIST_SUCCESS:
      return Object.assign({}, state, { data: payload.data })
    case CATEGORY_SAVE_FAIL:
    case CATEGORY_UPDATE_FAIL:
    case CATEGORY_LIST_FAIL:
    case CATEGORY_DELETE_LIST_FAIL:
      return Object.assign(
        {},
        state,
        {
          onError: true,
          errorMessage: payload ? payload.data : error.response.data,
        },
      )
    case CATEGORY_SAVE_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          onSuccess: true,
          successMessage: 'Data has been inserted successfully.',
        },
      )
    case CATEGORY_UPDATE_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          onSuccess: true,
          successMessage: 'Data has been updated successfully.',
        },
      )
    case CATEGORY_DELETE_LIST_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          onSuccess: true,
          successMessage: 'Data has been deleted successfully.',
        },
      )
    case CATEGORY_SAVE:
    case CATEGORY_UPDATE:
    case CATEGORY_DELETE_LIST:
    case CATEGORY_CLEAN_FAIL:
    case CATEGORY_CLEAN_SUCCESS:
      return Object.assign({}, state, initialState, { data: state.data })
    default:
      return state
  }
}

export default defaultState
