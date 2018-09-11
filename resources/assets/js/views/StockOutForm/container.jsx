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
  stockOutDetail as fetchDetail,
  stockOutSave as fetchSave,
  stockOutUpdate as fetchUpdate,
} from '../../repositories/stockOut'
import { itemAllIndex as fetchItemIndex } from '../../repositories/item'
import { STOCK_IN_SAVE_FAIL } from '../../constants/stockOut';
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
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  width200: {
    width: '200px',
  },
  width100: {
    width: '100px',
  },
  width75: {
    width: '75px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
};

const mapStateToProps = ({ screen, services }, props) => {
  const { id } = props.match.params
  return {
    onLoading: screen.stockOutLists.detail.onLoading || false,
    stockOut: screen.stockOutLists.detail.data || null,
    id,
    items: screen.itemLists.screen.data || [],
    errorMessage: screen.stockOutLists.detail.errorMessage || '',
    isError: screen.stockOutLists.detail.isError || null,
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDetail(...params) {
    return dispatch(fetchDetail(...params))
  },
  fetchSave(...params) {
    return dispatch(fetchSave(...params))
  },
  fetchUpdate(...params) {
    return dispatch(fetchUpdate(...params))
  },
  fetchItemIndex(...params) {
    return dispatch(fetchItemIndex(...params))
  },
  setError(message) {
    return dispatch({
      type: STOCK_IN_SAVE_FAIL,
      payload: {
        data: message,
      },
    })
  },
  openDialog(...params) {
    return dispatch(openDialog(...params))
  }
})

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Component)));
