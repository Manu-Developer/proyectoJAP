const profileForm = document.getElementById("profileForm");
const firstName = document.getElementById("firstName");
const middleName = document.getElementById("middleName");
const lastName1 = document.getElementById("lastName1");
const lastName2 = document.getElementById("lastName2");
const dateOfBirth = document.getElementById("dateOfBirth");
const email = document.getElementById("email");
const phone = document.getElementById("phone");

//Funcion que se encarga de mostrar todos los datos del usuario a partir de un objeto guardado en localStorage.
const showProfile = () => {
	let userProfile = JSON.parse(localStorage.getItem("userProfile")) || {};

	firstName.value = userProfile.firstName || "";
	middleName.value = userProfile.middleName || "";
	lastName1.value = userProfile.lastName1 || "";
	lastName2.value = userProfile.lastName2 || "";
	dateOfBirth.value = userProfile.dateOfBirth || "";
	email.value = userProfile.email || "";
	phone.value = userProfile.phone || "";
};

//Funcion que se encarga de modificar el perfil del usuario para posteriormente guardar esas modificaciones en el localStorage.
const saveProfile = () => {
	let userProfile = JSON.parse(localStorage.getItem("userProfile")) || {
		firstName: "",
		middleName: "",
		lastName1: "",
		lastName2: "",
		dateOfBirth: "",
		email: "",
		phone: "",
	};

	userProfile.firstName = firstName.value;
	userProfile.middleName = middleName.value;
	userProfile.lastName1 = lastName1.value;
	userProfile.lastName2 = lastName2.value;
	userProfile.dateOfBirth = dateOfBirth.value;
	userProfile.email = email.value;
	userProfile.phone = phone.value;

	localStorage.setItem("userProfile", JSON.stringify(userProfile));
	showProfile();
};

document.addEventListener("DOMContentLoaded", (e) => {
	document.getElementById("nav-userInfo").innerHTML = localStorage.getItem("userEmail");
	showProfile();

	document.getElementById("closeSession").addEventListener("click", () => {
		localStorage.removeItem("userEmail");
		window.location.replace("./index.html");
	});

	//Validaciones para el Formulario.
	profileForm.addEventListener("submit", (event) => {
		event.preventDefault();
		event.stopPropagation();

		if (profileForm.checkValidity()) {
			saveProfile();
			document.querySelector(".alert").style.display = "block";
		}
	});
});
