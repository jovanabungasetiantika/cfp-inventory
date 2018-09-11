import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import Component from './component';

import {
  getMe as fetchDetail,
  update as fetchUpdate,
} from '../../repositories/auth'

const styles = {
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

const mapStateToProps = ({ screen, services }) => {
  return {
    user: services.session.user || null,
    onLoading: services.session.onLoading,
    errorMessage: services.session.errorMessage,
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDetail(...params) {
    return dispatch(fetchDetail(...params))
  },
  fetchUpdate(...params) {
    return dispatch(fetchUpdate(...params))
  },
})

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Component)));
