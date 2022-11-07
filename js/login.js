const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");

//Agrego un evento de tipo submit al formulario, para que se procesen y validen todos los campos de texto rellenados por el usuario.
loginForm.addEventListener("submit", (event) => {
	event.preventDefault();
	event.stopPropagation();

	if (loginForm.checkValidity()) {
		localStorage.setItem("userEmail", emailInput.value);

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
	}
});
