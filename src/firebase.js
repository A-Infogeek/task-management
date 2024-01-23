// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getDatabase} from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNR0oQ4j2QqYHUUEmUmF14tv7rBSTXS6o",
  authDomain: "task-management-99799.firebaseapp.com",
  projectId: "task-management-99799",
  storageBucket: "task-management-99799.appspot.com",
  messagingSenderId: "120894439079",
  appId: "1:120894439079:web:e363e14d12142155046582"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db= getDatabase(app);