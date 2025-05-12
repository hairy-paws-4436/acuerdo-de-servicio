import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAytvmBv1Sp9Qc0fWItNFa5ia0S_cebvPY",
  authDomain: "acuerdo-de-servicio-hairy-paws.firebaseapp.com",
  projectId: "acuerdo-de-servicio-hairy-paws",
  storageBucket: "acuerdo-de-servicio-hairy-paws.firebasestorage.app",
  messagingSenderId: "732654710357",
  appId: "1:732654710357:web:baec78324f8a7572402edc",
  measurementId: "G-NKY9J74W50"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
