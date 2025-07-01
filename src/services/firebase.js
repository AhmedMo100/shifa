// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCHcGA0PAc500hNi0eJUcyMj6lAYrDGaug",
    authDomain: "snap-cakes.firebaseapp.com",
    projectId: "snap-cakes",
    storageBucket: "snap-cakes.firebasestorage.app",
    messagingSenderId: "798396515580",
    appId: "1:798396515580:web:ad323cf8d3e95482404379",
    measurementId: "G-4EN904V0FK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);