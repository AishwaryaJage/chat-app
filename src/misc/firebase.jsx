import { Notification as Toast } from 'rsuite';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/messaging';
import 'firebase/functions';
import { isLocalhost } from './helpers';

const config = {
  apiKey: 'AIzaSyDh2fMQzbUn7U2BYEm4JjTB0TTGbAbrRSg',
  authDomain: 'chat-web-app-abe71.firebaseapp.com',
  projectId: 'chat-web-app-abe71',
  databaseURL: 'https://chat-web-app-abe71-default-rtdb.firebaseio.com',
  storageBucket: 'chat-web-app-abe71.appspot.com',
  messagingSenderId: '864951969356',
  appId: '1:864951969356:web:9fa1506b49fc6d029d76e9',
};

export const fcmVapidKey =
  'BH1_kR0C-8aYrjgL0S4_bEo07F5KtYr_XTkEywIU_alRyQsFF78CBstfaRP8SAHlJTFZO3qqXHdlfUUWp_Cs7gY';

const app = firebase.initializeApp(config);
export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();
export const functions = app.functions('europe-west3');

export const messaging = firebase.messaging.isSupported()
  ? app.messaging()
  : null;

if (messaging) {
  messaging.usePublicVapidKey(
    'BH1_kR0C-8aYrjgL0S4_bEo07F5KtYr_XTkEywIU_alRyQsFF78CBstfaRP8SAHlJTFZO3qqXHdlfUUWp_Cs7gY'
  );

  messaging.onMessage(({ notification }) => {
    const { title, body } = notification;
    Toast.info({ title, description: body, duration: 0 });
  });
}

if (isLocalhost) {
  functions.useEmulator('localhost', 5001);
}
