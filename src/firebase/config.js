import * as firebase from 'firebase';

// Initialize Firebase
export const config = {
  apiKey: 'AIzaSyCIIZXVFNo0rktUqj7aadfIAMDY5kzB2gU',
  authDomain: 'ziium-bb222.firebaseapp.com',
  databaseURL: 'https://ziium-bb222.firebaseio.com',
  projectId: 'ziium-bb222',
  storageBucket: 'ziium-bb222.appspot.com',
  messagingSenderId: '361643278079',
};

export const googleMapsApiKey = 'AIzaSyDwKM1Pfr80o1hSX1C0tnHxplUzuaLe_Gw';

export default () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
};
