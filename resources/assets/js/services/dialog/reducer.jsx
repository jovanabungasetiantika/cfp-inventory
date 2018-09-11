/**
 * @flow
 */

import {
  OPEN_DIALOG,
  CLOSE_DIALOG,
} from './actionTypes'

/**
 * Initial state for Session
 */
export const initialState = {
  open: false,
  messageTile: '',
  messageBody: '',
  action: () => { },
}

/**
 * Session Reducer
 * @param {*} state Current state
 * @param {*} action Current Action
 */
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_DIALOG:
      return Object.assign({}, state, action.payload, { open: true })
    case CLOSE_DIALOG:
      return Object.assign({}, state, initialState)
    default:
      return state
  }
}
