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
  userDetail as fetchDetail,
  userSave as fetchSave,
  userUpdate as fetchUpdate,
} from '../../repositories/user'

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
  }
};

const mapStateToProps = ({ screen, services }, props) => {
  const { id } = props.match.params
  return {
    onLoading: screen.userLists.detail.onLoading || false,
    user: screen.userLists.detail.data || null,
    id,
    errorMessage: screen.userLists.detail.errorMessage || '',
    isError: screen.userLists.detail.isError || null,
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
})

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Component)));
