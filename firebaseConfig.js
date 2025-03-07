import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyALBtPKF4MLT4neg_eoncIWaMdeZwfXGNE",
  authDomain: "dmsiitdelhi-2f274.firebaseapp.com",
  projectId: "dmsiitdelhi-2f274",
  storageBucket: "dmsiitdelhi-2f274.appspot.com", // ✅ Fixed this line
  messagingSenderId: "420505567350",
  appId: "1:420505567350:web:8370d9a281c97901e39f57",
  measurementId: "G-TQCQM8BRMW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
