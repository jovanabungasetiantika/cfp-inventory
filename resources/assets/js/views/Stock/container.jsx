import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import tooltipStyle from "../../assets/jss/material-dashboard-react/tooltipStyle";
import {
  primaryColor,
  dangerColor
} from "../../assets/jss/material-dashboard-react";

import Component from './component';

import {
  stockIndex as fetchIndex,
  stockCleanFail as fetchCleanFail,
  stockReport,
  stockCardReport,
} from '../../repositories/stock'
import { openDialog } from '../../services/dialog/actions'

const styles = {
  ...tooltipStyle,
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  tableActionButton: {
    width: "27px",
    height: "27px"
  },
  tableActionButtonIcon: {
    width: "17px",
    height: "17px"
  },
  edit: {
    backgroundColor: "transparent",
    color: primaryColor,
    boxShadow: "none"
  },
  close: {
    backgroundColor: "transparent",
    color: dangerColor,
    boxShadow: "none"
  },
};

const mapStateToProps = ({ screen, services }) => ({
  onLoading: screen.stockLists.screen.onLoading || false,
  stocks: screen.stockLists.screen.data || {},
  errorMessage: screen.stockLists.screen.errorMessage || '',
})

const mapDispatchToProps = dispatch => ({
  fetchIndex(...params) {
    return dispatch(fetchIndex(...params))
  },
  fetchCleanFail(...params) {
    return dispatch(fetchCleanFail(...params))
  },
  stockReport(...params) {
    return dispatch(stockReport(...params))
  },
  stockCardReport(...params) {
    return dispatch(stockCardReport(...params))
  },
  openDialog(...params) {
    return dispatch(openDialog(...params))
  }
})

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Component)));
