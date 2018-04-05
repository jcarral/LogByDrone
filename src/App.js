import React, { Component } from 'react';
import { Provider } from 'react-redux';
import * as firebase from 'firebase';
import logo from './logo.svg';
import './App.css';
import { store, Router } from './config';

const config = {
  apiKey: "AIzaSyC42s40pI4C3JnUqCxSI-9DrVN_ApqX1q0",
  authDomain: "logbydrone.firebaseapp.com",
  databaseURL: "https://logbydrone.firebaseio.com",
  projectId: "logbydrone",
  storageBucket: "",
  messagingSenderId: "565660925494"
};
firebase.initializeApp(config);


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
