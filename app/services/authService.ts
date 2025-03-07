import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig"; // Import Firebase config
import AsyncStorage from "@react-native-async-storage/async-storage";

// ✅ Signup Function
export const signUpUser = async (name: string, email: string, password: string, entryNumber: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Store user details in Firestore
  await setDoc(doc(db, "users", user.uid), {
    name,
    email,
    progress: {},
    entryNumber
  });
  // ✅ Store user details in AsyncStorage for offline use
  await AsyncStorage.setItem("user_name", name);
  await AsyncStorage.setItem("user_entry_number", entryNumber);
  await AsyncStorage.setItem("user_email", email);
  await AsyncStorage.setItem("user_uid", user.uid);

  return user;
};


// ✅ Login Function
export const loginUser = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
  
    // ✅ Fetch user details from Firestore
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) throw new Error("User data not found!");
  
    const userData = userDoc.data();
  
    // ✅ Store user details in AsyncStorage for offline use
    await AsyncStorage.setItem("user_name", userData.name);
    await AsyncStorage.setItem("user_entry_number", userData.entryNumber);
    await AsyncStorage.setItem("user_email", userData.email);
    await AsyncStorage.setItem("user_uid", user.uid);
  
    return user;
  };
  

// ✅ Fetch User Profile
export const fetchUserProfile = async (userId: string) => {
  const userDoc = await getDoc(doc(db, "users", userId));
  return userDoc.exists() ? userDoc.data() : null;
};

// ✅ Logout Function
export const logoutUser = async () => {
  await signOut(auth);
};
