const CURRENT_CATEGORY_ID = localStorage.getItem("catID");
const CURRENT_CATEGORY_PRODUCTS = `https://japceibal.github.io/emercado-api/cats_products/${CURRENT_CATEGORY_ID}.json`;
let currentProductsArray = [];
let min = undefined;
let max = undefined;

//Funcion que se encarga de guardar el id del producto.
const setProductID = (id) => {
	localStorage.setItem("productID", id);
	window.location = "product-info.html";
};

//Funcion que se encarga de generar los fragmentos HTML correspondientes a cada producto.
const showProductsList = (productsArray) => {
	document.getElementById("prod-list-container").innerHTML = "";
	let htmlContentToAppend = "";

	for (const product of productsArray) {
		if (!(parseInt(product.cost) < min) && !(parseInt(product.cost) > max)) {
			htmlContentToAppend += `
            <a href="#" onclick="setProductID(${product.id})" class="border list-group-item list-group-item-action cursor-active mb-4">
                <div class="row">
                    <div class="col-12 col-md-3">
                        <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
                    </div>
                    <div class="col-12 col-md-9 pt-2 pt-md-0">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${product.name} - ${product.currency} ${product.cost}</h4>
                            <small class="text-muted">${product.soldCount} vendidos</small>
                        </div>
                        <p class="mb-1">${product.description}</p>
                    </div>
                </div>
            </a>
        `;
		}
	}
	document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
};

document.addEventListener("DOMContentLoaded", (e) => {
	if (!userEmail) {
		window.location.replace("./index.html");
	}

	document.getElementById("nav-userInfo").innerHTML = localStorage.getItem("userEmail");

	document.getElementById("closeSession").addEventListener("click", () => {
		localStorage.removeItem("userEmail");
		window.location.replace("./index.html");
	});

	//Obtenemos los datos de la categoria y lo guardamos en la variable global currentProductsArray.
	getJSONData(CURRENT_CATEGORY_PRODUCTS).then((resultObj) => {
		if (resultObj.status === "ok") {
			currentProductsArray = resultObj.data.products;
			showProductsList(currentProductsArray);
		}
	});

	document.getElementById("rangeFilterCount").addEventListener("click", () => {
		min = parseInt(document.getElementById("rangeFilterCountMin").value);
		max = parseInt(document.getElementById("rangeFilterCountMax").value);
		showProductsList(currentProductsArray);
	});

	document.getElementById("clearRangeFilter").addEventListener("click", () => {
		min = undefined;
		max = undefined;
		document.getElementById("rangeFilterCountMin").value = "";
		document.getElementById("rangeFilterCountMax").value = "";
		document.getElementById("filterText").value = "";
		showProductsList(currentProductsArray);
	});

	document.getElementById("sortByCount").addEventListener("click", () => {
		currentProductsArray.sort((a, b) => parseInt(b.soldCount) - parseInt(a.soldCount));
		showProductsList(currentProductsArray);
	});

	document.getElementById("filterText").addEventListener("input", () => {
		const filteredArray = currentProductsArray.filter((product) => product.name.toLowerCase().includes(filterText.value.toLowerCase()));
		showProductsList(filteredArray);
	});

	document.getElementById("sortDesc").addEventListener("click", () => {
		currentProductsArray.sort((a, b) => parseInt(b.cost) - parseInt(a.cost));
		showProductsList(currentProductsArray);
	});

	document.getElementById("sortAsc").addEventListener("click", () => {
		currentProductsArray.sort((a, b) => parseInt(a.cost) - parseInt(b.cost));
		showProductsList(currentProductsArray);
	});
});
