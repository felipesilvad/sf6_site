import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
"Private"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app)

export {storage, auth};
export default getFirestore();
