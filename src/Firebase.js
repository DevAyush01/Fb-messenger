// import { initializeApp } from "firebase/app";
// import firebase from "firebase/app"
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
import { getFirestore} from  'firebase/firestore';

import {initializeApp} from 'firebase/app'
import {getAnalytics} from 'firebase/analytics'
import { getDatabase } from 'firebase/database';

const firebaseConfig= {   
        apiKey: "AIzaSyALG2pChbkgLTTECN0bdlHQE4lOCvMTR94",
        authDomain: "facebook-messenger-clone-54e62.firebaseapp.com",
        databaseURL: "https://facebook-messenger-clone-54e62-default-rtdb.firebaseio.com",
        projectId: "facebook-messenger-clone-54e62",
        storageBucket: "facebook-messenger-clone-54e62.appspot.com",
        messagingSenderId: "488389615480",
        appId: "1:488389615480:web:231d0be2f8a8557d1bf28d",
        measurementId: "G-WW1CGTRVW8"
}

const app= initializeApp(firebaseConfig);
export const db = getDatabase(app)

export default app

