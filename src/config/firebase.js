import firebase from 'firebase';

const settings = {
  timestampsInSnapshots: true
};

const config = {
  apiKey: 'AIzaSyAdoQ5XAoNYIJeEg1LpZ612XkR4Gg7Z1tk',
  authDomain: 'thecolomboexpress.firebaseapp.com',
  databaseURL: 'https://thecolomboexpress.firebaseio.com',
  projectId: 'thecolomboexpress',
  storageBucket: 'thecolomboexpress.appspot.com',
  messagingSenderId: '72546651325',
  appId: '1:72546651325:web:2d63e5845785709509fbd4'
};

firebase.initializeApp(config);

firebase.firestore().settings(settings);
firebase
  .firestore()
  .enablePersistence({ synchronizeTabs: true });

export default firebase;
