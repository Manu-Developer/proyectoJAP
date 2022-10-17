const USER_25801 = `https://japceibal.github.io/emercado-api/user_cart/25801.json`;
const cartProducts = document.getElementById("cartProducts");
const shoppingCost = document.getElementById("express");
let productsOnStorage = JSON.parse(localStorage.getItem("productsOnCart")) || [];

//Funcion que se encarga de crear todos los elementos HTML correspondientes a partir de los productos dentro del carrito de compras.
const showCartProducts = (product) => {
	const tr = document.createElement("tr");

	tr.innerHTML = `
		<th scope="row"><img src="${product.image}" width="50px" alt="Imágen del producto ${product.name}" /></th>
		<td>${product.name}</td>
		<td >${product.currency} ${product.unitCost}</td>
		<td><input class="inputCart" type="number" value="${product.count}" min="0"/></td>
		<td class="tdSubTotal col-2">${product.currency} ${product.unitCost}</td>
	`;

	cartProducts.appendChild(tr);
	const input = tr.querySelector("input");

	//A la hora de cargar el carrito debe de mostrarse el subTotal, los agregados y el total correspondiente.
	document.getElementById("subTotal").innerHTML = `${Number(input.value) * product.unitCost}`
	document.getElementById("total").innerHTML = `${Number(input.value) * product.unitCost}`

	//Agrego el evento dentro del input para que cuando sea modificado tambien se modifique el campo del subtotal.
	input.addEventListener("input", () => {
		tr.querySelector(".tdSubTotal").innerHTML = `${product.currency} ${Number(input.value) * product.unitCost}`;
		document.getElementById("subTotal").innerHTML = `${Number(input.value) * product.unitCost}`
		document.getElementById("total").innerHTML = `${Number(input.value) * product.unitCost}`
	});
};

document.addEventListener("DOMContentLoaded", (e) => {
	document.getElementById("nav-userInfo").innerHTML = localStorage.getItem("userEmail");

	document.getElementById("premium").addEventListener("click",()=>{
		console.log("premium");
	})

	document.getElementById("express").addEventListener("click",()=>{
		console.log("express");
	})

	document.getElementById("standard").addEventListener("click",()=>{
		console.log("standard");
	})

	//Obtenemos los datos del carrito de compras para mostrarlos mediante elementos HTML.
	getJSONData(USER_25801).then((resultObj) => {
		if (resultObj.status === "ok") {
			const userCartProducts = [...resultObj.data.articles, ...productsOnStorage];
			userCartProducts.forEach((product) => showCartProducts(product));
		}
	});
});
