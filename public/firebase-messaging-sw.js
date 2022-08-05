import firebase from 'firebase/app';
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
// eslint-disable-next-line no-undef
importScripts(
  'https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js'
);

firebase.initializeApp({
  apiKey: 'AIzaSyDh2fMQzbUn7U2BYEm4JjTB0TTGbAbrRSg',
  authDomain: 'chat-web-app-abe71.firebaseapp.com',
  projectId: 'chat-web-app-abe71',
  databaseURL: 'https://chat-web-app-abe71-default-rtdb.firebaseio.com',
  storageBucket: 'chat-web-app-abe71.appspot.com',
  messagingSenderId: '864951969356',
  appId: '1:864951969356:web:9fa1506b49fc6d029d76e9',
});

firebase.messaging();
