const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const btnSubmit = document.getElementById("btnSubmit");
const msgInfo1 = document.getElementById("msg-info1");
const msgInfo2 = document.getElementById("msg-info2");

//Agrego un evento al boton de login, para que se procesen y validen todos los campos de texto rellenados por el usuario.
btnSubmit.addEventListener("click", (event) => {
	event.preventDefault();
	const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
	const passwordRegex = /^[(a-zA-Z0-9!@#$%^&*_)]{8,}$/;

	if (emailInput.value.match(emailRegex)) {
		emailInput.style.border = "1px solid #00992E";
		msgInfo1.style.display = "block";
		msgInfo1.innerHTML = "¡Perfecto!";
		if (passwordInput.value.match(passwordRegex)) {
			localStorage.setItem("userEmail", emailInput.value);
			window.location.replace("main.html");
		} else {
			passwordInput.value = "";
			passwordInput.focus();
			passwordInput.style.border = "1px solid #dc3545";
			msgInfo2.style.display = "block";
			msgInfo2.innerHTML = "Ingrese una contraseña válida";
		}
	} else {
		emailInput.focus();
		emailInput.value = "";
		emailInput.style.border = "1px solid #dc3545";
		msgInfo1.style.display = "block";
		msgInfo1.innerHTML = "Ingrese un Email válido";
	}
});
