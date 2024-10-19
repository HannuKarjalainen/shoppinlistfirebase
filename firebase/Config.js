import { initializeApp } from "firebase/app";
import { getFirestore,collection,addDoc,serverTimestamp,query,onSnapshot,deleteDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "lisää api tähän",
    authDomain: "shoppinglist-f0a43.firebaseapp.com",
    projectId: "shoppinglist-f0a43",
    storageBucket: "shoppinglist-f0a43.appspot.com",
    messagingSenderId: "764262655416",
    appId: "1:764262655416:web:58e8d7a683bf57c4addb4d"
}

initializeApp(firebaseConfig);

const firestore = getFirestore();

const MESSAGES = 'messages';

export {
    firestore,
    collection,
    addDoc,
    serverTimestamp,
    query,
    onSnapshot,
    deleteDoc,
    MESSAGES
}