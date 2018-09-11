import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'; // eslint-disable-line import/no-extraneous-dependencies
// import { createEpicMiddleware } from 'redux-observable';

import httpMiddleware from './httpMiddleware';

import servicesReducer from '../services/reducer';
import nonPersistReducer from '../services/nonPersistent';

const appReducer = combineReducers({
  services: servicesReducer,
  screen: nonPersistReducer,
})

const middleware = [thunk, httpMiddleware]
middleware.push(createLogger())

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose //eslint-disable-line

const enhancer = composeEnhancers(applyMiddleware(...middleware))

/**
 * Default Store
 */
const store = createStore(
  appReducer,
  enhancer,
)

export default store
