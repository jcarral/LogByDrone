import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SignUpScreen } from './screens/';
import { Validator } from '../utils';
import { signup } from './auth.actions';

class SignUp extends Component {

  state = {
    email: '',
    password: '',
    repeatPassword: '',
    name: '',
    groupName: '',
    errors: [],
  };

  componentWillReceiveProps = nextProps => {
    const { isLoggedIn, history } = nextProps;
    if (isLoggedIn) return history.push('/');
  }

  handleChangeText = (text, key) => {
    let tmpState = {};
    tmpState[key] = text;
    this.setState(Object.assign({}, this.state, tmpState));
  };

  handleSignUp = () => {
    const { email, password, repeatPassword, name, groupName } = this.state;
    const { signUpAction } = this.props;

    let errors = [];
    if (!Validator.isEmail(email)) errors.push('Email incorrecto');
    if (!Validator.isPassword(password, repeatPassword)) errors.push('Contraseñas incorrectas');
    if (!Validator.isName(name)) errors.push('Nombre demasiado corto');
    if (!Validator.isName(groupName)) errors.push('Nombre de organización demasiado corto');

    if (errors.length === 0){
      let stateCopy = Object.assign({}, this.state);
      delete stateCopy.errors;
      signUpAction(stateCopy); 
    } else {
      console.log('Error :(', errors);
      this.setState({errors})
    };
  };

  render(){
    const { loading } = this.props;
    return (
    <SignUpScreen
      handleChangeText={this.handleChangeText}
      handleSignUp={this.handleSignUp}
      values={this.state}
    />);
  }
}

const mapStateToProps = (state, action) => ({
  loading: state.auth.isLogging,
  isLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  signUpAction: (data) => dispatch(signup(data)),
});

export const SignUpPage = connect(mapStateToProps, mapDispatchToProps)(SignUp);
