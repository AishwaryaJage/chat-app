import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyDh2fMQzbUn7U2BYEm4JjTB0TTGbAbrRSg',
  authDomain: 'chat-web-app-abe71.firebaseapp.com',
  projectId: 'chat-web-app-abe71',
  storageBucket: 'chat-web-app-abe71.appspot.com',
  messagingSenderId: '864951969356',
  appId: '1:864951969356:web:9fa1506b49fc6d029d76e9',
};

const app = firebase.initializeApp(config);
export const auth = app.auth();
export const database = app.database();
