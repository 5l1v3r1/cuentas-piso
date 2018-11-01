import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "",
    authDomain: "cuentas-piso-app.firebaseapp.com",
    databaseURL: "https://cuentas-piso-app.firebaseio.com",
    projectId: "cuentas-piso-app",
    storageBucket: "cuentas-piso-app.appspot.com",
    messagingSenderId: ""
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
