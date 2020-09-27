import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom';
import './index.scss';
import DashboardPage from './pages/Dashboard/DashboardPage';
import LoginPage from './pages/Login/LoginPage';
import LoginComplete from './pages/Login/LoginComplete';
import PageNotFound from './pages/PageNotFound';
import { path } from './config';

const PrivateRoute = ({component: Component, ...rest}) => {
  const loginToken = localStorage.getItem('token');
  return (
    <Route
      {...rest}
      render={ props => (
        loginToken ? (
          <Component {...props} />
        ) : (
          <Redirect to={path.login}/>
        )
      )
      }
    />
  );
};

const App = () => (
  <HashRouter>
    <Switch>
      <Route exact path={path.auth} component={LoginComplete}/>
      <PrivateRoute exact path={path.dashboard} component={DashboardPage}/>
      <Route exact path={path.login} component={LoginPage}/>
      <Route path='*' exact component={PageNotFound} />
    </Switch>
  </HashRouter>

);


ReactDOM.render(<App />, document.getElementById('root'));
