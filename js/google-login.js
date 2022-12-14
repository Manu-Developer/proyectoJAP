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
		const {email} = user;
		localStorage.setItem("userEmail", email);

		let userProfile = JSON.parse(localStorage.getItem("userProfile")) || {
			firstName: "",
			middleName: "",
			lastName1: "",
			lastName2: "",
			email: "",
			phone: "",
		};

		userProfile.email = localStorage.getItem("userEmail");
		localStorage.setItem("userProfile", JSON.stringify(userProfile));

		window.location.replace("main.html");
	});
});
