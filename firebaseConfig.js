import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyALBtPKF4MLT4neg_eoncIWaMdeZwfXGNE",
  authDomain: "dmsiitdelhi-2f274.firebaseapp.com",
  projectId: "dmsiitdelhi-2f274",
  storageBucket: "dmsiitdelhi-2f274.appspot.com",
  messagingSenderId: "420505567350",
  appId: "1:420505567350:web:8370d9a281c97901e39f57",
  measurementId: "G-TQCQM8BRMW",
};

// ✅ Initialize Firebase App
const app = initializeApp(firebaseConfig);

// ✅ Enable Firestore Offline Mode (New Method)
const db = initializeFirestore(app, {
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
});

// ✅ Initialize Authentication
const auth = getAuth(app);

// ✅ Initialize Storage (if needed)
const storage = getStorage(app);

export { auth, db, storage };
