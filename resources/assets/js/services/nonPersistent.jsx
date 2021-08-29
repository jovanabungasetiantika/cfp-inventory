import { combineReducers } from 'redux'
import categoryLists from './categoryList/index'
import itemLists from './itemList/index'
import userLists from './userList/index'
import stockInLists from './stockInList/index'
import stockOutLists from './stockOutList/index'
import stockLists from './stockList/index'

const reducer = combineReducers({
  categoryLists,
  itemLists,
  userLists,
  stockInLists,
  stockOutLists,
  stockLists,
})

export default reducer
