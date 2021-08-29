/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
import _ from 'lodash';
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

// core components
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import Snackbar from "../../components/Snackbar/Snackbar.jsx";
import ResponsiveDialog from "../../components/ResponsiveDialog/ResponsiveDialog.jsx";

import dashboardRoutes from "../../routes/dashboard.jsx";

import image from "../../assets/img/sidebar-2.jpg";
import logo from "../../assets/img/cc-logo-1.png";

import parseError from '../../libs/parseError'

const switchRoutes = (
  <Switch>
    {dashboardRoutes.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.to} key={key} />;
      else
        return <Route path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false
    };
    this.resizeFunction = this.resizeFunction.bind(this);
    this.visibleDashboardRoutes = _.filter(dashboardRoutes, e => !e.hide)
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  }

  getRoute() {
    return this.props.location.pathname !== "/maps";
  }

  resizeFunction() {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }

  componentDidMount() {
    this.getUser()
    if (navigator.platform.indexOf("Win") > -1) {
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
    window.addEventListener("resize", this.resizeFunction);
  }

  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
  }

  getUser = async () => {
    const { fetchDetail } = this.props

    await fetchDetail()
  }

  doLogout = () => {
    const { openDialog, logout } = this.props
    openDialog({
      title: 'Log out sekarang?',
      body: '',
      action: async () => {
        await logout()
      },
    })
  }

  onClose = async () => {
    const { cleanFunc, message, logout } = this.props
    const { status, message: parseMessage } = message
    let clearMessage = ''
    if (parseMessage) {
      clearMessage = parseMessage
    } else {
      clearMessage = parseError(message)
    }
    if (this.props[`${cleanFunc}`]) {
      await this.props[`${cleanFunc}`]()
      if (clearMessage.indexOf('Unauthenticated') > -1) {
        await logout()
      }
    }
  }

  render() {
    const {
      classes,
      isError,
      isOpen,
      message,
      user,
      ...rest,
    } = this.props;
    return (
      <div className={classes.wrapper}>
        <Sidebar
          logoText={"Inventaris CFP"}
          routes={this.visibleDashboardRoutes}
          logo={logo}
          // image={image}
          user={user}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color="purple"
          {...rest}
        />
        <div className={classes.mainPanel} ref="mainPanel">
          <Header
            routes={dashboardRoutes}
            doLogout={this.doLogout}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
          <Footer />
          <Snackbar
            place="tc"
            color={isError ? 'danger' : 'info'}
            icon={AddAlert}
            message={message}
            open={isOpen}
            closeNotification={this.onClose}
            autoHideDuration={isError ? null : 7000}
            close
          />
          <ResponsiveDialog />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default App
