import {
  OPEN_DIALOG,
  CLOSE_DIALOG,
} from './actionTypes'

export const openDialog = ({ title, body, action }) => ({
  type: OPEN_DIALOG,
  payload: {
    messageTitle: title,
    messageBody: body,
    action,
  }
})

export const closeDialog = () => ({
  type: CLOSE_DIALOG,
})
