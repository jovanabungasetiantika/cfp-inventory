import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "../../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

import Component from './component';

import {
  stockLowIndex as fetchIndex,
} from '../../repositories/stock'
import { openDialog } from '../../services/dialog/actions'

const mapStateToProps = ({ screen, services }) => ({
  onLoading: screen.stockLists.screen.onLoading || false,
  stocks: screen.stockLists.screen.data || {},
  errorMessage: screen.stockLists.screen.errorMessage || '',
})

const mapDispatchToProps = dispatch => ({
  fetchIndex(...params) {
    return dispatch(fetchIndex(...params))
  },
  stockReport(...params) {
    return dispatch(stockReport(...params))
  },
  openDialog(...params) {
    return dispatch(openDialog(...params))
  }
})

export default withRouter(withStyles(dashboardStyle)(connect(mapStateToProps, mapDispatchToProps)(Component)));
