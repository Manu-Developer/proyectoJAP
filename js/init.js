const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

//Funcion para activar display:block en el spinner.
let showSpinner = function () {
	document.getElementById("spinner-wrapper").style.display = "block";
};

//Funcion para activar display:none en el spinner.
let hideSpinner = function () {
	document.getElementById("spinner-wrapper").style.display = "none";
};

//Funcion principal para obtener los datos a partir de una URL mediante el uso de fetch y promises.
//Si todo esta OK, nos retorna un objeto con los datos solicitados y en caso de fallo nos retorna un objeto que nos indica que hubo un error.
let getJSONData = function (url) {
	let result = {};
	showSpinner();
	return fetch(url)
		.then((response) => {
			if (response.ok) {
				return response.json();
			} else {
				throw Error(response.statusText);
			}
		})
		.then(function (response) {
			result.status = "ok";
			result.data = response;
			hideSpinner();
			return result;
		})
		.catch(function (error) {
			result.status = "error";
			result.data = error;
			hideSpinner();
			return result;
		});
};
