import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'
// ... other firebase imports

export const firebaseApp = initializeApp({
  
  apiKey: "AIzaSyBIe_D3fbwxxKB3G-CUNP1b3EQTVrL4XnE",
  authDomain: "recordatoriosvue-e619a.firebaseapp.com",
  projectId: "recordatoriosvue-e619a",
  storageBucket: "recordatoriosvue-e619a.firebasestorage.app",
  messagingSenderId: "320623784417",
  appId: "1:320623784417:web:200e42078c4e07a409e2a0",
  measurementId: "G-LKRSF83BZN"
})

// used for the firestore refs
const db = getFirestore(firebaseApp)

// here we can export reusable database references
export const todosRef = collection(db, 'todos')