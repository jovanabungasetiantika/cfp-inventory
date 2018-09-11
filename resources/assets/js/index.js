import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createBrowserHistory } from "history";
import { Router, Switch } from "react-router-dom";

import store from './libs/store';
import "./assets/css/material-dashboard-react.css?v=1.4.0";
import isExpired from './libs/isExpired'
import CheckRoute from './components/CheckRoute/CheckRoute'
import Login from './views/Login/container'

import indexRoutes from "./routes/index.jsx";

const hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        {indexRoutes.map((prop, key) => {
          if (prop.path === '/login' || prop.path === '/register') {
            return (
              <CheckRoute
                path={prop.path}
                component={prop.component}
                isGuest
                decisionFunc={() => !isExpired()}
                key={key}
              />
            )
          }
          return (
            <CheckRoute
              path={prop.path}
              component={prop.component}
              decisionFunc={isExpired}
              key={key}
            />
          )
          // return <Route path={prop.path} component={prop.component} key={key} />;
        })}
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
