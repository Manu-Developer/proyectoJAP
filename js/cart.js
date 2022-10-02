const USER_25801 = `https://japceibal.github.io/emercado-api/user_cart/25801.json`;
const cartProducts = document.getElementById("cartProducts");

//Funcion que se encarga de crear todos los elementos HTML correspondientes a partir del carrito de compras del usuario 25801.
const showCartProducts = (userCartProduct) => {
	let tr = document.createElement("tr");
	let tdInput = document.createElement("td");
	let input = document.createElement("input");
	let tdSubTotal = document.createElement("td");

	tr.innerHTML = `
		<th scope="row"><img src="${userCartProduct.articles[0].image}" width="50px" alt="" /></th>
		<td>${userCartProduct.articles[0].name}</td>
		<td >USD ${userCartProduct.articles[0].unitCost}</td>
	`;
	tdSubTotal.classList.add("tdSubTotal");
	tdSubTotal.innerHTML = `USD ${userCartProduct.articles[0].unitCost}`;
	tdSubTotal.classList.add("col-2");

	tdInput.appendChild(input);
	input.classList.add("inputCart");
	input.setAttribute("type", "number");
	input.value = userCartProduct.articles[0].count;

	tr.appendChild(tdInput);
	tr.appendChild(tdSubTotal);
	cartProducts.appendChild(tr);

	//Agrego los eventos dentro del input para que cuando sea modificado tambien se modifique el campo del subtotal.
	input.addEventListener("change", () => {
		tdSubTotal.innerHTML = `USD ${Number(input.value) * userCartProduct.articles[0].unitCost}`;
	});

	input.addEventListener("keyup", () => {
		tdSubTotal.innerHTML = `USD ${Number(input.value) * userCartProduct.articles[0].unitCost}`;
	});
};

document.addEventListener("DOMContentLoaded", (e) => {
	document.getElementById("nav-userInfo").innerHTML = localStorage.getItem("userEmail");

	//Obtenemos los datos del carrito de compras del Usuario 25801 para mostrarlos mediante elementos HTML.
	getJSONData(USER_25801).then((resultObj) => {
		if (resultObj.status === "ok") {
			let userCartProducts = resultObj.data;
			showCartProducts(userCartProducts);
		}
	});
});
