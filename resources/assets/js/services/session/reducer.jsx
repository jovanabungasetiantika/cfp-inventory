/**
 * @flow
 */

import Cookies from 'universal-cookie'
import Moment from 'moment'

import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  UPDATE,
  UPDATE_SUCCESS,
  UPDATE_FAIL,
  GET_ME,
  GET_ME_SUCCESS,
  GET_ME_FAIL,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  AUTH_CLEAN_FAIL,
  AUTH_CLEAN_SUCCESS,
} from '../../constants/auth'
import { SET_TOKEN } from './actionTypes'

/**
 * Initial state for Session
 */
export const initialState = {
  user: {
    email: null,
    username: null,
    name: null,
  },
  onLoading: false,
  onError: false,
  onSuccess: false,
  errorMessage: null,
  successMessage: null,
}

/**
 * Session Reducer
 * @param {*} state Current state
 * @param {*} action Current Action
 */
export const reducer = (state = initialState, { type, payload, error }) => {
  const cookies = new Cookies()
  switch (type) {
    case LOGOUT:
      cookies.remove('cfpinv');
      return Object.assign({}, state, initialState)
    case LOGIN:
    case REGISTER:
      return Object.assign({}, state, initialState, { onLoading: true })
    case GET_ME_FAIL:
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case UPDATE_FAIL:
    case CHANGE_PASSWORD_FAIL:
      return Object.assign(
        {},
        state,
        {
          onError: true,
          onLoading: false,
          errorMessage: payload ? payload.data : error.response.data,
        },
      )
    case LOGIN_SUCCESS:
      cookies.set('cfpinv', payload.data, { path: '/', expires: Moment().add(1, 'd').toDate() });
      return Object.assign({}, state, { user: payload.data.user, onLoading: false })
    // case LOGOUT_SUCCESS:
    //   cookies.set('cfpinv', payload.data, { path: '/login' });
    //   return Object.assign({}, state, { onLoading: false })
    case REGISTER_SUCCESS:
      cookies.set('cfpinv', payload.data, { path: '/', expires: Moment().add(1, 'd').toDate() });
      return Object.assign({}, state, { user: payload.data.user, onLoading: false })
    case UPDATE:
    case GET_ME:
      return Object.assign({}, state, { user: initialState.user, onLoading: true, })
    case UPDATE_SUCCESS:
    case GET_ME_SUCCESS:
      return Object.assign({}, state, {
        user: payload.data,
        onLoading: false,
      })
    case SET_TOKEN:
      return Object.assign({}, state, payload)
    case CHANGE_PASSWORD:
    case CHANGE_PASSWORD_SUCCESS:
    case AUTH_CLEAN_FAIL:
    case AUTH_CLEAN_SUCCESS:
      return Object.assign({}, state, initialState, { tokens: state.tokens })
    default:
      return state
  }
}
