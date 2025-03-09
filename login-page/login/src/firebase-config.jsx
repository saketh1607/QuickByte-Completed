// firebase-config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAV9YdOZKn_WMIusmPYHcKnCY4RQfBjC88",
  authDomain: "quickbite-45bc4.firebaseapp.com",
  projectId: "quickbite-45bc4",
  storageBucket: "quickbite-45bc4.appspot.com",
  messagingSenderId: "851454204708",
  appId: "1:851454204708:web:2e40d8af33ccf1ffaab1b1",
  measurementId: "G-08DLVV5T8G"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);