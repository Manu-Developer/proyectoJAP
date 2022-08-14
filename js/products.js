const PRODUCTS_CAR = "https://japceibal.github.io/emercado-api/cats_products/101.json";

function showProductsList() {
	let htmlContentToAppend = "";

	for (let i = 0; i < currentProductsArray.length; i++) {
		let product = currentProductsArray[i];
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
	document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
}

document.addEventListener("DOMContentLoaded", function (e) {
	getJSONData(PRODUCTS_CAR).then(function (resultObj) {
		if (resultObj.status === "ok") {
			currentProductsArray = resultObj.data.products;
			showProductsList();
		}
	});
});
