import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase App configuration
const firebaseConfig = {
	apiKey: "AIzaSyBlgbd-OAAC_LjfT-ruPAd1HNl_gkB53Ww",
	authDomain: "agustinadz-happy-lunch.firebaseapp.com",
	projectId: "agustinadz-happy-lunch",
	storageBucket: "agustinadz-happy-lunch.firebasestorage.app",
	messagingSenderId: "890526516359",
	appId: "1:890526516359:web:74b82f5d3ffb87504ea422"
};

// Initialize Firebase
const app = initializeApp( firebaseConfig );

const db = getFirestore( app );

const auth = getAuth( app );

export { db, auth };