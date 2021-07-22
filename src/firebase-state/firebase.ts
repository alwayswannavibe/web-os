// React, redux
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import { setMessages } from 'src/redux/slices/appsSlicesBus/chatSlice';
import store from 'src/redux/store';
import { login } from 'src/redux/slices/userSlice';

// Types
import { Message } from 'src/types/message';

const firebaseConfig = {
  apiKey: 'AIzaSyA42y_gIdsMEU3xrR_yLMQHzavK9xCEjfY',
  authDomain: 'web-os-new.firebaseapp.com',
  projectId: 'web-os-new',
  storageBucket: 'web-os-new.appspot.com',
  messagingSenderId: '434791000983',
  appId: '1:434791000983:web:1d472f9409469be70b72d2',
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();

firebase.auth().onAuthStateChanged(() => {
  const username =
    auth.currentUser?.email?.split('@')[0] || localStorage.getItem('username') || `User-${uuid().slice(0, 8)}`;
  localStorage.setItem('username', username);
  const name = auth.currentUser?.displayName || '';
  const photo = auth.currentUser?.photoURL || '';
  store.dispatch(
    login({
      username,
      name,
      photo,
    }),
  );
});

firestore.collection('chat').onSnapshot(async () => {
  const messages: Message[] = [];
  await firestore
    .collection('chat')
    .orderBy('date')
    .limit(100)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        messages.push({
          username: doc.data().username,
          text: doc.data().text,
          photo: doc.data().photoURL,
          id: doc.id,
          date: (doc.data().date.toDate() || new Date()).toLocaleDateString(store.getState().locale.locale, {
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          }),
        });
      });
    });
  store.dispatch(setMessages(messages));
});

export { firebase, auth, firestore };
