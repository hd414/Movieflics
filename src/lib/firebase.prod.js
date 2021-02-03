import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';



const config = {
    apiKey: "AIzaSyCL2QjoO-zqFjiwWAt0-ZamAj1N2yB7SjY",
    authDomain: "netflix-clone-cdda8.firebaseapp.com",
    projectId: "netflix-clone-cdda8",
    storageBucket: "netflix-clone-cdda8.appspot.com",
    messagingSenderId: "625966558946",
    appId: "1:625966558946:web:2b43d5a92a54afd45438bb",
    measurementId: "G-WM97XCTD9X"
};



const firebase = Firebase.initializeApp(config);


// seedDatabase(firebase);



export default firebase;