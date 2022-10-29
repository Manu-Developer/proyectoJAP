const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");

//Agrego un evento de tipo submit al formulario, para que se procesen y validen todos los campos de texto rellenados por el usuario.
loginForm.addEventListener("submit", (event) => {
	event.preventDefault();
	event.stopPropagation();

	if (loginForm.checkValidity()) {
		localStorage.setItem("userEmail", emailInput.value);
		window.location.replace("main.html");
	}
});
