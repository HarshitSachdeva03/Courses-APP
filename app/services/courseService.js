import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig"; // Import Firestore instance

// Function to fetch all courses
export const getCourses = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "courses"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
};
