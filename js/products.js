const CURRENT_CATEGORY_ID = localStorage.getItem("catID");
const PRODUCTS_CAR = `https://japceibal.github.io/emercado-api/cats_products/${CURRENT_CATEGORY_ID}.json`;
let min = undefined;
let max = undefined;

function showProductsList(productsArray) {
	document.getElementById("prod-list-container").innerHTML = "";
	let htmlContentToAppend = "";

	for (const product of productsArray) {
		if (!(parseInt(product.cost) < min) && !(parseInt(product.cost) > max)) {
			htmlContentToAppend += `
            <a href="#" class="list-group-item list-group-item-action">
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
}

document.addEventListener("DOMContentLoaded", function (e) {
	document.getElementById("nav-userInfo").innerHTML = localStorage.getItem("userEmail");

	getJSONData(PRODUCTS_CAR).then(function (resultObj) {
		if (resultObj.status === "ok") {
			currentProductsArray = resultObj.data.products;
			showProductsList(currentProductsArray);
		}
	});

	document.getElementById("rangeFilterCount").addEventListener("click", function () {
		min = parseInt(document.getElementById("rangeFilterCountMin").value);
		max = parseInt(document.getElementById("rangeFilterCountMax").value);
		showProductsList(currentProductsArray);
	});

	document.getElementById("clearRangeFilter").addEventListener("click", function () {
		min = undefined;
		max = undefined;
		document.getElementById("rangeFilterCountMin").value = "";
		document.getElementById("rangeFilterCountMax").value = "";
		showProductsList(currentProductsArray);
	});

	document.getElementById("sortByCount").addEventListener("click", function () {
		currentProductsArray.sort((a, b) => {
			return parseInt(b.soldCount) - parseInt(a.soldCount);
		});
		showProductsList(currentProductsArray);
	});

	document.getElementById("sortDesc").addEventListener("click", function () {
		currentProductsArray.sort((a, b) => {
			return parseInt(b.cost) - parseInt(a.cost);
		});
		showProductsList(currentProductsArray);
	});

	document.getElementById("sortAsc").addEventListener("click", function () {
		currentProductsArray.sort((a, b) => {
			return parseInt(a.cost) - parseInt(b.cost);
		});
		showProductsList(currentProductsArray);
	});
});
