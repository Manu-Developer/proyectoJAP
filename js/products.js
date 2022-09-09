const CURRENT_CATEGORY_ID = localStorage.getItem("catID");
const CURRENT_CATEGORY_PRODUCTS = `https://japceibal.github.io/emercado-api/cats_products/${CURRENT_CATEGORY_ID}.json`;
let currentProductsArray = [];
let min = undefined;
let max = undefined;

const setProductID = (id) => {
	localStorage.setItem("productID", id);
	window.location = "product-info.html";
};

const showProductsList = (productsArray) => {
	document.getElementById("prod-list-container").innerHTML = "";
	let htmlContentToAppend = "";

	for (const product of productsArray) {
		if (!(parseInt(product.cost) < min) && !(parseInt(product.cost) > max)) {
			htmlContentToAppend += `
            <a href="#" onclick="setProductID(${product.id})" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-12 col-md-3">
                        <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
                    </div>
                    <div class="col-12 col-md-9 pt-2 pt-md-0">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${product.name} - USD ${product.cost}</h4>
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
	document.getElementById("nav-userInfo").innerHTML = localStorage.getItem("userEmail");

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
		showProductsList(currentProductsArray);
	});

	document.getElementById("sortByCount").addEventListener("click", () => {
		currentProductsArray.sort((a, b) => {
			return parseInt(b.soldCount) - parseInt(a.soldCount);
		});
		showProductsList(currentProductsArray);
	});

	document.getElementById("sortDesc").addEventListener("click", () => {
		currentProductsArray.sort((a, b) => {
			return parseInt(b.cost) - parseInt(a.cost);
		});
		showProductsList(currentProductsArray);
	});

	document.getElementById("sortAsc").addEventListener("click", () => {
		currentProductsArray.sort((a, b) => {
			return parseInt(a.cost) - parseInt(b.cost);
		});
		showProductsList(currentProductsArray);
	});
});
