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
  stockInCleanSuccess as fetchStockInCleanSuccess,
  stockInCleanFail as fetchStockInCleanFail,
} from '../../repositories/stockIn'

import { openDialog } from '../../services/dialog/actions'

const mapStateToProps = ({ screen, services }) => {
  const categoryListDetailErrorMessage = screen.categoryLists.detail.errorMessage
  const categoryListErrorMessage = screen.categoryLists.screen.errorMessage
  const itemListDetailErrorMessage = screen.itemLists.detail.errorMessage
  const itemListErrorMessage = screen.itemLists.screen.errorMessage
  const stockInListDetailErrorMessage = screen.stockInLists.detail.errorMessage
  const stockInListErrorMessage = screen.stockInLists.screen.errorMessage
  const serviceSessionErrorMessage = services.session.errorMessage

  const categoryListDetailSuccessMessage = screen.categoryLists.detail.successMessage
  const categoryListSuccessMessage = screen.categoryLists.screen.errorMessage
  const itemListDetailSuccessMessage = screen.itemLists.detail.successMessage
  const itemListSuccessMessage = screen.itemLists.screen.successMessage
  const stockInListSuccessMessage = screen.stockInLists.screen.successMessage
  const stockInListDetailSuccessMessage = screen.stockInLists.detail.successMessage

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
  } else if (stockInListDetailSuccessMessage) {
    successMessage = stockInListDetailSuccessMessage
    cleanFunc = 'fetchStockInCleanSuccess'
  } else if (stockInListSuccessMessage) {
    successMessage = stockInListSuccessMessage
    cleanFunc = 'fetchStockInCleanSuccess'
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
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  logout(...params) {
    dispatch(logout(...params))
    ownProps.history.push('/login')
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
  openDialog(...params) {
    return dispatch(openDialog(...params))
  }
})

export default withRouter(withStyles(style)(connect(mapStateToProps, mapDispatchToProps)(Component)));
