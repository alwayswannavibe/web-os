import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { setMessages } from 'redux/slices/chatSlice';
import store from 'redux/store';
import { Message } from 'types/message';
import { login } from '../redux/slices/userSlice';

const firebaseConfig = {
  apiKey: 'AIzaSyCtrDQtgNZrUiWMKYlFnmYB8TvpaKq2MWQ',
  authDomain: 'web-os-5d6eb.firebaseapp.com',
  projectId: 'web-os-5d6eb',
  storageBucket: 'web-os-5d6eb.appspot.com',
  messagingSenderId: '816527099816',
  appId: '1:816527099816:web:1527e4bc304b4c6490ff9d',
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();

firebase.auth().onAuthStateChanged(() => {
  const username = auth.currentUser?.email?.split('@')[0] || '';
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
          date: doc.data().date?.toDate() || new Date(),
        });
      });
    });
  store.dispatch(setMessages(messages));
});

export { firebase, auth, firestore };
