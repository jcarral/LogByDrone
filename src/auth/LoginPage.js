import React, { Component } from 'react';
import { connect } from 'react-redux';

import { LoginScreen } from './screens';
import { login } from './auth.actions';

class LoginContainer extends Component {

  state = {
    email: '',
    password: '',
  };

  componentWillReceiveProps = nextProps => {
    const { isLoggedIn, history } = nextProps;
    if (isLoggedIn) return history.push('/');
  }

  handleLogin = () => {
    const { loginAction } = this.props;
    const { email, password } = this.state;
    loginAction(email, password);
  }

  handleChangeText = (text, key) => {
    let tmpState = {};
    tmpState[key] = text;
    this.setState(Object.assign({}, this.state, tmpState));
  }

  render() {
    return (<LoginScreen
      values={this.state}
      handleChangeText={this.handleChangeText}
      handleLogin={this.handleLogin}
    />);
  }
}

const mapStateToProps = (state, action) => ({
  isLoggedIn: state.auth.isLoggedIn,
  error: state.auth.error,
  isLogging: state.auth.isLogging,
});

const mapDispatchToProps = (dispatch) => ({
  loginAction: (email, password) => dispatch(login(email, password)),
});

export const LoginPage = connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
