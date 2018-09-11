import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import Component from './component';

import {
  login,
  authCleanFail as fetchCleanFail,
} from '../../repositories/auth'

const styles = {
  grid: {
    margin: "0 !important",
    paddingTop: "150px",
  },
  delimiter: {
    flex: 1,
  },
  container: {
    maxWidth: "800px",
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

const mapStateToProps = ({screen, services}) => {
  return {
    onLoading: services.session.onLoading,
    errorMessage: services.session.errorMessage,
  }
}

const mapDispatchToProps = dispatch => ({
  login(...params) {
    return dispatch(login(...params))
  },
  fetchCleanFail() {
    return dispatch(fetchCleanFail())
  },
})

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Component)));
