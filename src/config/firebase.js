import firebase from 'firebase';

const settings = {
  timestampsInSnapshot: true
};

const config = {};

firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;
