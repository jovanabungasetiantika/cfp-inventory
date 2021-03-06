import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import style from "../../assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";
import { logout } from '../../repositories/auth'
import Component from './component'

import {
  authCleanSuccess as fetchCleanSuccess,
  authCleanFail as fetchCleanFail,
  getMe as fetchDetail,
} from '../../repositories/auth'

import {
  categoryCleanSuccess as fetchCategoryCleanSuccess,
  categoryCleanFail as fetchCategoryCleanFail,
} from '../../repositories/category'

import {
  itemCleanSuccess as fetchItemCleanSuccess,
  itemCleanFail as fetchItemCleanFail,
} from '../../repositories/item'

import {
  userCleanSuccess as fetchUserCleanSuccess,
  userCleanFail as fetchUserCleanFail,
} from '../../repositories/user'

import {
  stockInCleanSuccess as fetchStockInCleanSuccess,
  stockInCleanFail as fetchStockInCleanFail,
} from '../../repositories/stockIn'

import {
  stockOutCleanSuccess as fetchStockOutCleanSuccess,
  stockOutCleanFail as fetchStockOutCleanFail,
} from '../../repositories/stockOut'

import {
  stockCleanSuccess as fetchStockCleanSuccess,
  stockCleanFail as fetchStockCleanFail,
} from '../../repositories/stock'

import { openDialog } from '../../services/dialog/actions'

const mapStateToProps = ({ screen, services }) => {
  const categoryListDetailErrorMessage = screen.categoryLists.detail.errorMessage
  const categoryListErrorMessage = screen.categoryLists.screen.errorMessage
  const itemListDetailErrorMessage = screen.itemLists.detail.errorMessage
  const itemListErrorMessage = screen.itemLists.screen.errorMessage
  const stockInListDetailErrorMessage = screen.stockInLists.detail.errorMessage
  const stockInListErrorMessage = screen.stockInLists.screen.errorMessage
  const stockOutListDetailErrorMessage = screen.stockOutLists.detail.errorMessage
  const stockOutListErrorMessage = screen.stockOutLists.screen.errorMessage
  const stockListDetailErrorMessage = screen.stockLists.detail.errorMessage
  const stockListErrorMessage = screen.stockLists.screen.errorMessage
  const serviceSessionErrorMessage = services.session.errorMessage

  const categoryListDetailSuccessMessage = screen.categoryLists.detail.successMessage
  const categoryListSuccessMessage = screen.categoryLists.screen.errorMessage
  const itemListDetailSuccessMessage = screen.itemLists.detail.successMessage
  const itemListSuccessMessage = screen.itemLists.screen.successMessage
  const userListDetailSuccessMessage = screen.userLists.detail.successMessage
  const userListSuccessMessage = screen.userLists.screen.successMessage
  const stockInListSuccessMessage = screen.stockInLists.screen.successMessage
  const stockInListDetailSuccessMessage = screen.stockInLists.detail.successMessage
  const stockOutListSuccessMessage = screen.stockOutLists.screen.successMessage
  const stockOutListDetailSuccessMessage = screen.stockOutLists.detail.successMessage
  const stockListSuccessMessage = screen.stockLists.screen.successMessage
  const stockListDetailSuccessMessage = screen.stockLists.detail.successMessage

  const serviceSessionSuccessMessage = services.session.successMessage

  let errorMessage
  let cleanFunc
  if (categoryListDetailErrorMessage) {
    errorMessage = categoryListDetailErrorMessage
    cleanFunc = 'fetchCategoryCleanFail'
  } else if (categoryListErrorMessage) {
    errorMessage = categoryListErrorMessage
    cleanFunc = 'fetchCategoryCleanFail'
  } else if (itemListDetailErrorMessage) {
    errorMessage = itemListDetailErrorMessage
    cleanFunc = 'fetchItemCleanFail'
  } else if (itemListErrorMessage) {
    errorMessage = itemListErrorMessage
    cleanFunc = 'fetchItemCleanFail'
  } else if (stockInListDetailErrorMessage) {
    errorMessage = stockInListDetailErrorMessage
    cleanFunc = 'fetchStockInCleanFail'
  } else if (stockInListErrorMessage) {
    errorMessage = stockInListErrorMessage
    cleanFunc = 'fetchStockInCleanFail'
  } else if (stockOutListDetailErrorMessage) {
    errorMessage = stockOutListDetailErrorMessage
    cleanFunc = 'fetchStockOutCleanFail'
  } else if (stockOutListErrorMessage) {
    errorMessage = stockOutListErrorMessage
    cleanFunc = 'fetchStockOutCleanFail'
  } else if (stockListDetailErrorMessage) {
    errorMessage = stockListDetailErrorMessage
    cleanFunc = 'fetchStockCleanFail'
  } else if (stockListErrorMessage) {
    errorMessage = stockListErrorMessage
    cleanFunc = 'fetchStockCleanFail'
  } else if (serviceSessionErrorMessage) {
    cleanFunc = 'fetchCleanFail'
    errorMessage = serviceSessionErrorMessage
  }

  let successMessage
  if (categoryListDetailSuccessMessage) {
    cleanFunc = 'fetchCategoryCleanSuccess'
    successMessage = categoryListDetailSuccessMessage
  } else if (categoryListSuccessMessage) {
    successMessage = categoryListSuccessMessage
    cleanFunc = 'fetchCategoryCleanSuccess'
  } else if (itemListDetailSuccessMessage) {
    successMessage = itemListDetailSuccessMessage
    cleanFunc = 'fetchItemCleanSuccess'
  } else if (itemListSuccessMessage) {
    successMessage = itemListSuccessMessage
    cleanFunc = 'fetchItemCleanSuccess'
  } else if (userListDetailSuccessMessage) {
    successMessage = userListDetailSuccessMessage
    cleanFunc = 'fetchUserCleanSuccess'
  } else if (userListSuccessMessage) {
    successMessage = userListSuccessMessage
    cleanFunc = 'fetchUserCleanSuccess'
  } else if (stockInListDetailSuccessMessage) {
    successMessage = stockInListDetailSuccessMessage
    cleanFunc = 'fetchStockInCleanSuccess'
  } else if (stockInListSuccessMessage) {
    successMessage = stockInListSuccessMessage
    cleanFunc = 'fetchStockInCleanSuccess'
  } else if (stockOutListDetailSuccessMessage) {
    successMessage = stockOutListDetailSuccessMessage
    cleanFunc = 'fetchStockOutCleanSuccess'
  } else if (stockOutListSuccessMessage) {
    successMessage = stockOutListSuccessMessage
    cleanFunc = 'fetchStockOutCleanSuccess'
  } else if (stockListDetailSuccessMessage) {
    successMessage = stockListDetailSuccessMessage
    cleanFunc = 'fetchStockCleanSuccess'
  } else if (stockListSuccessMessage) {
    successMessage = stockListSuccessMessage
    cleanFunc = 'fetchStockCleanSuccess'
  } else if (serviceSessionSuccessMessage) {
    cleanFunc = 'fetchCleanSuccess'
    successMessage = serviceSessionSuccessMessage
  }

  let isError
  let message = ''
  let isOpen = false
  if (errorMessage) {
    isError = true
    isOpen = true
    message = errorMessage
  } else if (successMessage) {
    isError = false
    isOpen = true
    message = successMessage
  }

  return {
    isError,
    isOpen,
    message,
    cleanFunc,
    user: services.session.user,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  logout(...params) {
    dispatch(logout(...params))
    ownProps.history.push('/login')
  },
  fetchDetail(...params) {
    return dispatch(fetchDetail(...params))
  },
  fetchCleanSuccess(...params) {
    return dispatch(fetchCleanSuccess(...params))
  },
  fetchCleanFail(...params) {
    return dispatch(fetchCleanFail(...params))
  },
  fetchCategoryCleanSuccess(...params) {
    return dispatch(fetchCategoryCleanSuccess(...params))
  },
  fetchCategoryCleanFail(...params) {
    return dispatch(fetchCategoryCleanFail(...params))
  },
  fetchItemCleanSuccess(...params) {
    return dispatch(fetchItemCleanSuccess(...params))
  },
  fetchItemCleanFail(...params) {
    return dispatch(fetchItemCleanFail(...params))
  },
  fetchStockInCleanSuccess(...params) {
    return dispatch(fetchStockInCleanSuccess(...params))
  },
  fetchStockInCleanFail(...params) {
    return dispatch(fetchStockInCleanFail(...params))
  },
  fetchStockOutCleanSuccess(...params) {
    return dispatch(fetchStockOutCleanSuccess(...params))
  },
  fetchStockOutCleanFail(...params) {
    return dispatch(fetchStockOutCleanFail(...params))
  },
  fetchStockCleanSuccess(...params) {
    return dispatch(fetchStockCleanSuccess(...params))
  },
  fetchStockCleanFail(...params) {
    return dispatch(fetchStockCleanFail(...params))
  },
  openDialog(...params) {
    return dispatch(openDialog(...params))
  }
})

export default withRouter(withStyles(style)(connect(mapStateToProps, mapDispatchToProps)(Component)));
