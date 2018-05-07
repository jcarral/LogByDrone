import React, { Component } from 'react';
import { Switch, Route, Link, Redirect, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser } from '../auth';

import { LoginPage, SignUpPage } from '../auth';
import { Hangar } from '../hangar';

import {MainNavBar} from '../mainNavbar.js';

const ProtectedRoute = ({ component: Comp, loggedIn, path, ...rest }) => {
  return (
    <Route
      exact={true}
      path={path}
      {...rest}
      render={
        (props) => {
          return loggedIn ? <Comp {...props} /> : <Redirect to={{
            pathname: '/login',
            state: {
              prevLocation: path,
              error: 'You need to login first'
            }
          }
          }
          />
        }
      }
    />
  );
};

const AnonRoute = ({ component: Comp, loggedIn, path, ...rest }) => (
  <Route
    exact={true}
    path={path}
    {...rest}
    render={
      (props) => {
        return !loggedIn ? <Comp {...props} /> : <Redirect to={{
          pathname: '/',
          state: {
            prevLocation: path,
            error: 'You need to logout first'
          }
        }
        }
        />
      }
    }
  />
);

class RouterApp extends Component {
  state = {}
  componentWillMount = () => {
    const { getUserAction } = this.props;
    getUserAction();
  }


  render() {
    const { state = {} } = this.props.location || {};
    const { error } = state;
    const { loggedIn } = this.props;
    return (
      <BrowserRouter>
      <div>
        {
          !loggedIn
          &&  <MainNavBar/>
        }

        {error && <div> Error: {error} </div>}
          <Switch>
            <AnonRoute path='/login' component={LoginPage} loggedIn={loggedIn}/>
            <AnonRoute path='/signup' component={SignUpPage} loggedIn={loggedIn}/>
            <ProtectedRoute path='/' component={Hangar} loggedIn={loggedIn} />
            <ProtectedRoute path='/profile' component={TestComponent} loggedIn={loggedIn} />
            <Redirect from='*' to='Hangar' />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state, action) => ({
  loggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  getUserAction : () => dispatch(getUser()),
});

export const Router = connect(mapStateToProps, mapDispatchToProps)(RouterApp);

/**
 *
*/

const TestComponent = () => (
  <div className="App">
    <header className="App-header">

      <h1 className="App-title">Welcome to React</h1>
    </header>
    <p className="App-intro">
      To get started, edit <code>src/App.js</code> and save to reload.
        </p>
  </div>
);
