import baseUrl from '../constants/url'
import { fetchPost, fetchIndex, fetchPatch } from '../actions/fetch'
import {
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  GET_ME,
  GET_ME_SUCCESS,
  GET_ME_FAIL,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_CLEAN_FAIL,
  AUTH_CLEAN_SUCCESS,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  UPDATE,
  UPDATE_SUCCESS,
  UPDATE_FAIL,
} from '../constants/auth'

const logoutType = [
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
]

export const logout = () => ({
  type: LOGOUT,
})

const loginType = [
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
]

export const login = ({ username, password }) => dispatch => {
  const data = {
    email: username,
    password,
  }
  const url = `${baseUrl}api/login`
  return dispatch(fetchPost(url, null, data, loginType))
}

const registerType = [
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
]

export const register = params => dispatch => {
  const {
    name,
    username,
    email,
    password,
    confirmPassword,
  } = params
  const data = {
    name,
    username,
    email,
    password,
    c_password: confirmPassword,
  }
  const url = `${baseUrl}api/register`
  return dispatch(fetchPost(url, null, data, registerType))
}

const getMeType = [
  GET_ME,
  GET_ME_SUCCESS,
  GET_ME_FAIL,
]

export const getMe = () => dispatch => {
  const url = `${baseUrl}api/user/self`
  return dispatch(fetchIndex(url, null, null, getMeType))
}

const updateType = [
  UPDATE,
  UPDATE_SUCCESS,
  UPDATE_FAIL,
]

export const update = ({ id, ...params }) => dispatch => {
  const data = {
    ...params,
  }
  const url = `${baseUrl}api/user/${id}`
  return dispatch(fetchPatch(url, null, data, updateType))
}

const changePasswordType = [
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
]

export const changePassword = params => dispatch => {
  const data = {
    fos_user_change_password_form: {
      current_password: params.currentPassword,
      plainPassword: params.plainPassword,
    },
  }
  const url = `${baseUrl}api/change-password`
  return dispatch(fetchPost(url, null, data, changePasswordType))
}

export const authCleanFail = () => dispatch => {
  return dispatch({
    type: AUTH_CLEAN_FAIL,
  })
}

export const authCleanSuccess = () => dispatch => {
  return dispatch({
    type: AUTH_CLEAN_SUCCESS,
  })
}

export default null
