import { combineReducers } from 'redux'

import { reducer as sessionReducer } from './session/reducer'
import { reducer as dialogReducer } from './dialog/reducer'

/**
 * Combine All Service Reducer
 */
const reducer = combineReducers({
  dialog: dialogReducer,
  session: sessionReducer,
})

export default reducer
