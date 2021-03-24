import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyCUMtPaMR5Dr3qlkgUc22kuWMRBYy4WJHE',
  authDomain: 'instagram-clone-76171.firebaseapp.com',
  projectId: 'instagram-clone-76171',
  storageBucket: 'instagram-clone-76171.appspot.com',
  messagingSenderId: '417884749312',
  appId: '1:417884749312:web:029b064effdda8eb20e2e5',
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
