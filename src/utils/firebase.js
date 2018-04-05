import * as firebase from 'firebase';

export class Firebase {
  static logIn = async (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
  };
}
