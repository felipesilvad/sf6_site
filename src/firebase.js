import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC6rAC77WC3_SDpRw4WGClaVOKQAv5eXxs",
  authDomain: "sf6-vods.firebaseapp.com",
  projectId: "sf6-vods",
  storageBucket: "sf6-vods.appspot.com",
  messagingSenderId: "296375482397",
  appId: "1:296375482397:web:47e0b15b3c085c2d826ef4",
  measurementId: "G-E98PGYSZ0D"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app)

export {storage, auth};
export default getFirestore();