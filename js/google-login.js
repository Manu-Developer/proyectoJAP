/* GOOGLE OAUTH */
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js";

const firebaseConfig = {
	apiKey: "AIzaSyBM1_-Cx52AT0t05U1Ns2Tk7W32D0tGtOc",
	authDomain: "e-commerce-c52d5.firebaseapp.com",
	projectId: "e-commerce-c52d5",
	storageBucket: "e-commerce-c52d5.appspot.com",
	messagingSenderId: "72369670571",
	appId: "1:72369670571:web:8579978832037270bf6aee",
	measurementId: "G-VQM1NVGEXB",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
document.getElementById("google-auth").addEventListener("click", async () => {
	provider.addScope("profile");
	signInWithPopup(auth, provider).then(({user}) => {
		//Para usos posteriores declaro displayName y photoURL
		const {displayName, email, photoURL} = user;
		window.localStorage.setItem("userEmail", email);
		window.location.replace("main.html");
	});
});
