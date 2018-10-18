import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyBX7AfuTvoq7X9AkNPIhj1pfx1MuY89K7Q",
    authDomain: "cuentas-piso-app.firebaseapp.com",
    databaseURL: "https://cuentas-piso-app.firebaseio.com",
    projectId: "cuentas-piso-app",
    storageBucket: "cuentas-piso-app.appspot.com",
    messagingSenderId: "738772367848"
};


if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {
  auth,
  db,
};