import { initializeApp } from "firebase/app";
import {getFirestore, collection, addDoc, serverTimestamp, query, onSnapshot} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBSE6JescSDLW3CbT5rH0ygXX0A6jduoBo",
  authDomain: "test-a5ba3.firebaseapp.com",
  projectId: "test-a5ba3",
  storageBucket: "test-a5ba3.appspot.com",
  messagingSenderId: "711113079464",
  appId: "1:711113079464:web:400dfee0c9f2dbfadfe09d"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const firestore = getFirestore()

const MESSAGES = 'messages'

export {
    firestore,
    collection,
    addDoc,
    MESSAGES,
    serverTimestamp,
    query,
    onSnapshot
}