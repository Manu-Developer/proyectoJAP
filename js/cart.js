const USER_25801 = `https://japceibal.github.io/emercado-api/user_cart/25801.json`;
const cartProducts = document.getElementById("cartProducts");
const shoppingCost = document.getElementById("express");
let productsOnStorage = JSON.parse(localStorage.getItem("productsOnCart")) || [];
let userCartProducts = [];

// Elementos HTML relacionados al Formulario que seran validados mediante Bootstrap.
const cartForm = document.getElementById("cartForm");
const cardNumber = document.getElementById("cardNumber");
const securityCode = document.getElementById("securityCode");
const expiration = document.getElementById("expiration");
const accountNumber = document.getElementById("accountNumber");
const paymentSelection = document.getElementById("paymentSelection");
const invalidFeedback = document.querySelector(".invalidFeedback");
const submitForm = document.getElementById("submitForm");

let subTotalFinalUSD = 0;

//Funcion para calcular el costo final de todos los productos (sin incluir el costo del envio).
const calculateFinalCost = () => {
	let costAccumulator = 0;

	for (const product of userCartProducts) {
		let totalCostProduct = product.unitCost * product.count;
		if (product.currency == "UYU") {
			totalCostProduct = parseInt(totalCostProduct / 42);
			costAccumulator += totalCostProduct;
		} else {
			costAccumulator += totalCostProduct;
		}
	}

	subTotalFinalUSD = costAccumulator;
};

//Funcion que se encarga de calcular y posteriormente mostrar el subtotal, el costo del envio y el costo final (incluyendo el costo del envio).
const showFinalCost = () => {
	const subTotal = document.getElementById("subTotal");
	const shoppingCost = document.getElementById("shoppingCost");
	const totalCost = document.getElementById("total");

	subTotal.innerHTML = `USD ${subTotalFinalUSD}`;

	if (document.getElementById("premium").checked) {
		shoppingCost.innerHTML = `USD ${parseInt(subTotalFinalUSD * 0.15)}`;
		totalCost.innerHTML = `USD ${subTotalFinalUSD + parseInt(subTotalFinalUSD * 0.15)}`;
	} else if (document.getElementById("express").checked) {
		shoppingCost.innerHTML = `USD ${parseInt(subTotalFinalUSD * 0.07)}`;
		totalCost.innerHTML = `USD ${subTotalFinalUSD + parseInt(subTotalFinalUSD * 0.07)}`;
	} else if (document.getElementById("standard").checked) {
		shoppingCost.innerHTML = `USD ${parseInt(subTotalFinalUSD * 0.05)}`;
		totalCost.innerHTML = `USD ${subTotalFinalUSD + parseInt(subTotalFinalUSD * 0.05)}`;
	}
};

//Funcion que se encarga de crear todos los elementos HTML correspondientes a partir de los productos dentro del carrito de compras.
const showCartProducts = (product) => {
	let subTotalProducto = product.unitCost;
	subTotalFinalUSD += subTotalProducto;

	const tr = document.createElement("tr");

	tr.innerHTML = `
		<th scope="row"><img src="${product.image}" width="50px" alt="Imágen del producto ${product.name}" /></th>
		<td>${product.name}</td>
		<td >${product.currency} ${product.unitCost}</td>
		<td><input class="inputCart" type="number" value="${product.count}" min="1"/></td>
		<td class="tdSubTotal col-2">${product.currency} ${product.unitCost}</td>
	`;

	cartProducts.appendChild(tr);
	const input = tr.querySelector("input");

	//Agrego el evento dentro del input para que cuando sea modificado tambien se modifique la propiedad count del producto correspondiente.
	input.addEventListener("input", () => {
		tr.querySelector(".tdSubTotal").innerHTML = `${product.currency} ${Number(input.value) * product.unitCost}`;
		product.count = input.value;
		calculateFinalCost();
		showFinalCost();
	});
};

document.addEventListener("DOMContentLoaded", (e) => {
	if (!userEmail) {
		window.location.replace("./index.html");
	}

	document.getElementById("nav-userInfo").innerHTML = localStorage.getItem("userEmail");

	document.querySelector(".btn-close").addEventListener("click", () => {
		document.querySelector(".alert").style.display = "none";
	});

	document.getElementById("closeSession").addEventListener("click", () => {
		localStorage.removeItem("userEmail");
		window.location.replace("./index.html");
	});

	document.getElementById("premium").addEventListener("click", () => {
		calculateFinalCost();
		showFinalCost();
	});

	document.getElementById("express").addEventListener("click", () => {
		calculateFinalCost();
		showFinalCost();
	});

	document.getElementById("standard").addEventListener("click", () => {
		calculateFinalCost();
		showFinalCost();
	});

	//Validaciones para el Modal.
	document.getElementById("paymentMethod1").addEventListener("click", () => {
		accountNumber.setAttribute("disabled", "");
		cardNumber.removeAttribute("disabled", "");
		securityCode.removeAttribute("disabled", "");
		expiration.removeAttribute("disabled", "");

		paymentSelection.innerHTML = "Tarjeta de Crédito";
		invalidFeedback.style.display = "none";
	});

	//Validaciones para el Modal.
	document.getElementById("paymentMethod2").addEventListener("click", () => {
		accountNumber.removeAttribute("disabled", "");
		cardNumber.setAttribute("disabled", "");
		securityCode.setAttribute("disabled", "");
		expiration.setAttribute("disabled", "");

		paymentSelection.innerHTML = "Transferencia Bancaria";
		invalidFeedback.style.display = "none";
	});

	//Validaciones para el Formulario.
	cartForm.addEventListener("submit", (event) => {
		event.preventDefault();
		event.stopPropagation();

		if (cartForm.checkValidity()) {
			document.querySelector(".alert").style.display = "block";
		}
	});

	//Obtenemos los datos del carrito de compras para mostrarlos mediante elementos HTML.
	getJSONData(USER_25801).then((resultObj) => {
		if (resultObj.status === "ok") {
			userCartProducts = [...resultObj.data.articles, ...productsOnStorage];
			userCartProducts.forEach((product) => showCartProducts(product));
			calculateFinalCost();
			showFinalCost();
		}
	});
});
