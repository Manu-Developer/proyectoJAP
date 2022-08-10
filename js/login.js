const emailInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const btnSubmit = document.getElementById("btnSubmit");
const msgError1 = document.getElementById("msg-error1");
const msgError2 = document.getElementById("msg-error2");

btnSubmit.addEventListener("click", (event) => {
	event.preventDefault();
	const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	const passwordRegex = /^[(a-zA-Z0-9!@#$%^&*_)]{8,}$/;

	if (emailInput.value.match(emailRegex)) {
		emailInput.style.border = "none";
		msgError1.style.display = "none";
		if (passwordInput.value.match(passwordRegex)) {
			window.location.replace("index.html");
		} else {
			passwordInput.style.border = "1px solid red";
			msgError2.style.display = "block";
			msgError2.innerHTML = "Ingrese una contraseña válida";
		}
	} else {
		emailInput.style.border = "1px solid red";
		msgError1.style.display = "block";
		msgError1.innerHTML = "Ingrese un Email válido";
	}
});

document.getElementById("password").addEventListener("change", (event) => {
	msgError.style.display = "none";
});
