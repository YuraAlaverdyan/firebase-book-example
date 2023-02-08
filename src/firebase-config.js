// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCmbioFurFLEUTCZyFNvQPXBQNeT9SWXrM",
    authDomain: "fir-practice-e96e6.firebaseapp.com",
    projectId: "fir-practice-e96e6",
    storageBucket: "fir-practice-e96e6.appspot.com",
    messagingSenderId: "398061125484",
    appId: "1:398061125484:web:a9f850b6ac42b46434fd49"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app)