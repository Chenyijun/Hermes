import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
  } from "firebase/auth";
  import {
    getFirestore,
    collection,
    addDoc,
  } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCR67Wmr9XabnSzTF15zJVP1_QuGDrw7RM",
    authDomain: "hermes-95b99.firebaseapp.com",
    projectId: "hermes-95b99",
    storageBucket: "hermes-95b99.appspot.com",
    messagingSenderId: "83805063915",
    appId: "1:83805063915:web:4f612472083ea2cc150cae",
    measurementId: "G-6JWQ963TD7"
  };

const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
const auth = getAuth(firebaseApp);
console.log('AUTH', auth)
console.log('AUTHUSER', auth.currentUser)

const db = getFirestore(firebaseApp);

  

const logInWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  const registerWithEmailAndPassword = async (name, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log('res', res)
      const user = res.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const signInWithGoogle = async () => {
    // Retrieve Google provider object
    const provider = new auth.GoogleAuthProvider();
    // Set language to the default browser preference
    auth.useDeviceLanguage();
    // Start sign in process
    try {
      await signInWithPopup(provider);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logOut = async () => {
    try {
        auth.currentUser  &&
      await signOut(auth).then(()=>{
          console.log('sign out')
      });
    } catch (error) {
      console.log(error.message);
    }
  };

export {
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logOut
};