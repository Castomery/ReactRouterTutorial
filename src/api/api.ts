
import { initializeApp } from "firebase/app";
import { collection, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB0e0G4FqO5lnPYFSKgLT7wneGtAyueUIg",
  authDomain: "vanlife-43269.firebaseapp.com",
  projectId: "vanlife-43269",
  storageBucket: "vanlife-43269.firebasestorage.app",
  messagingSenderId: "857152467168",
  appId: "1:857152467168:web:5b4011e680cdba61c42085"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const vansCollectionRef = collection(db, "vans");

export async function getVans(){
    const querySnapshot = await getDocs(vansCollectionRef);
    const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }));
    return dataArr;
}

export async function getVan(id: string){
    const docRef = doc(db, "vans", id);
    const vanSnapshot = await getDoc(docRef);
    return {...vanSnapshot.data(),
        id:vanSnapshot.id
    };
}

export async function getHostVans(){
    const q  = query(vansCollectionRef, where("hostId", "==", "123"))
    const querySnapshot = await getDocs(q);
    const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }));
    return dataArr;
}

export async function loginUser(creds: any) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}