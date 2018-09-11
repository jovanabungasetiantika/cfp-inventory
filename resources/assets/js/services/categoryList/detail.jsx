import _ from 'lodash'

import {
  CATEGORY_DETAIL_SUCCESS,
  CATEGORY_DETAIL,
  CATEGORY_DETAIL_FAIL,
  CATEGORY_SAVE,
  CATEGORY_SAVE_SUCCESS,
  CATEGORY_SAVE_FAIL,
  CATEGORY_UPDATE,
  CATEGORY_UPDATE_SUCCESS,
  CATEGORY_UPDATE_FAIL,
  CATEGORY_DELETE,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_FAIL,
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
    case CATEGORY_DETAIL:
      return Object.assign({}, state, initialState)
    case CATEGORY_DETAIL_SUCCESS:
      return Object.assign({}, state, { data: payload.data })
    // case CATEGORY_SAVE_FAIL:
    case CATEGORY_DETAIL_FAIL:
    // case CATEGORY_UPDATE_FAIL:
    case CATEGORY_DELETE_FAIL:
      return Object.assign(
        {},
        state,
        {
          onError: true,
          errorMessage: payload ? payload.data : error.response.data,
        },
      )
    // case CATEGORY_SAVE_SUCCESS:
      // return Object.assign(
      //   {},
      //   state,
      //   {
      //     data: [...state.data, payload.data],
      //     onSuccess: true,
      //     successMessage: 'Data has been inserted successfully.',
      //   },
      // )
    // case CATEGORY_UPDATE_SUCCESS:
    //   tempData = _.find(state.data, d => d.id === payload.data.id) || {}
    //   tempIdx = _.map(state.data, e => e.id).indexOf(payload.data.id)
    //   if (tempIdx > -1) {
    //     return Object.assign(
    //       {},
    //       state,
    //       {
    //         data: [
    //           ...state.data.slice(0, tempIdx),
    //           Object.assign({}, tempData, payload.data),
    //           ...state.data.slice(tempIdx + 1),
    //         ],
    //         onSuccess: true,
    //         successMessage: 'Data has been updated successfully.',
    //       },
    //     )
    //   }
    //   return state
    case CATEGORY_DELETE_SUCCESS:
      tempData = _.find(state.data, d => d.id === payload.data.id) || {}
      tempIdx = _.map(state.data, e => e.id).indexOf(payload.data.id)
      if (tempIdx > -1) {
        return Object.assign(
          {},
          state,
          {
            data: [
              ...state.data.slice(0, tempIdx),
              Object.assign({}, tempData, payload.data),
              ...state.data.slice(tempIdx + 1),
            ],
            onSuccess: true,
            successMessage: 'Data has been deleted successfully.',
          },
        )
      }
      return state
    // case CATEGORY_SAVE:
    // case CATEGORY_UPDATE:
    case CATEGORY_DELETE:
    case CATEGORY_CLEAN_FAIL:
    case CATEGORY_CLEAN_SUCCESS:
      return Object.assign({}, state, initialState, { data: state.data })
    default:
      return state
  }
}

export default defaultState
