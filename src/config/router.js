import React, { Component } from 'react';
import { Switch, Route, Link, Redirect, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { LoginPage } from '../auth';

const ProtectedRoute = ({ component: Comp, loggedIn, path, ...rest }) => {
  return (
    <Route
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

class RouterApp extends Component {
  state = {}

  render() {
    const { state = {} } = this.props.location || {};
    const { error } = state;
    const { loggedIn } = this.props;
    return (
      <BrowserRouter>
      <div>
          {loggedIn &&
        (<nav>
          <Link to='/'> Home </Link>
          <Link to='/profile'> Profile </Link>
          <Link to='/flights'> Flights </Link>
          <Link to='/pilot'> Pilots </Link>
          <Link to='/upload'> Upload </Link>
        </nav>)
        }
        {error && <div> Error: {error} </div>}
          <Switch>
            <Route exact path='/login' component={LoginPage} />
            <ProtectedRoute path='/' component={TestComponent} loggedIn={loggedIn}/>
            <ProtectedRoute path='/profile' component={TestComponent} loggedIn={loggedIn} />
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
