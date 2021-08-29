import _ from 'lodash'

import {
  ITEM_DETAIL_SUCCESS,
  ITEM_DETAIL,
  ITEM_DETAIL_FAIL,
  ITEM_SAVE,
  ITEM_SAVE_SUCCESS,
  ITEM_SAVE_FAIL,
  ITEM_UPDATE,
  ITEM_UPDATE_SUCCESS,
  ITEM_UPDATE_FAIL,
  ITEM_DELETE,
  ITEM_DELETE_SUCCESS,
  ITEM_DELETE_FAIL,
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
    case ITEM_DETAIL:
      return Object.assign({}, state, initialState, { onLoading: true })
    case ITEM_DETAIL_SUCCESS:
      return Object.assign({}, state, { data: payload.data, onLoading: false })
    case ITEM_SAVE_FAIL:
    case ITEM_DETAIL_FAIL:
    case ITEM_UPDATE_FAIL:
    case ITEM_DELETE_FAIL:
      return Object.assign(
        {},
        state,
        {
          onError: true,
          onLoading: false,
          errorMessage: payload ? payload.data : error.response.data,
        },
      )
    case ITEM_SAVE_SUCCESS:
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
    case ITEM_UPDATE_SUCCESS:
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
    case ITEM_DELETE_SUCCESS:
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
    case ITEM_SAVE:
    case ITEM_UPDATE:
    case ITEM_DELETE:
      return Object.assign({}, state, initialState, { data: state.data, onLoading: true })
    case ITEM_CLEAN_FAIL:
    case ITEM_CLEAN_SUCCESS:
      return Object.assign({}, state, initialState, { data: state.data, onLoading: false })
    default:
      return state
  }
}

export default defaultState
