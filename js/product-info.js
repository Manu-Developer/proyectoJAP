const CURRENT_PRODUCT_ID = localStorage.getItem("productID");
const CURRENT_PRODUCT = `https://japceibal.github.io/emercado-api/products/${CURRENT_PRODUCT_ID}.json`;
const CURRENT_PRODUCT_COMMENTS = `https://japceibal.github.io/emercado-api/products_comments/${CURRENT_PRODUCT_ID}.json`;
const productDataContainer = document.getElementById("productDataContainer");
const productCommentsContainer = document.getElementById("comments");
const commentInput = document.getElementById("comment-text");
const ratingInput = document.getElementById("rating");
const btnSendComment = document.getElementById("btnSendComment");
const relatedProductsContainer = document.getElementById("related-products");
const btnBuy = document.getElementById("comprar");

let productsOnStorage = JSON.parse(localStorage.getItem("productsOnCart")) || [];

const setProductID = (id) => {
	localStorage.setItem("productID", id);
	window.location = "product-info.html";
};

//Funcion que se encarga de crear un fragmento HTML segun los datos que obtengamos de la consulta.
const showProductData = (product) => {
	productDataContainer.innerHTML = `
        <div class="mt-5">
            <h1 id="categoryName">${product.name}</h1>
            <hr class="my-3" />
            <h5 class="fw-bold">Precio</h5>
            <p id="productPrice">UYU ${product.cost}</p>
            <h5 class="fw-bold">Descripción</h5>
            <p id="productDescription">${product.description}</p>
            <h5 class="fw-bold">Categoría</h5>
            <p id="productCategory">${product.category}</p>
            <h5 class="fw-bold">Cantidad de Vendidos</h5>
            <p id="productSoldCount">${product.soldCount} vendidos</p>
            <h5 class="fw-bold">Imágenes ilustrativas</h5>
            <div class="row text-center text-lg-left pt-2" id="productImagesGallery">
                <div class="col-lg-3 col-md-4 col-12">
                    <div class="d-block h-100">
                        <img class="img-fluid img-thumbnail" src="img/prod${product.id}_1.jpg" alt="" />
                    </div>
                </div>
                <div class="col-lg-3 col-md-4 col-12">
                    <div class="d-block h-100">
                        <img class="img-fluid img-thumbnail" src="img/prod${product.id}_2.jpg" alt="" />
                    </div>
                </div>
                <div class="col-lg-3 col-md-4 col-12">
                    <div class="d-block h-100">
                        <img class="img-fluid img-thumbnail" src="img/prod${product.id}_3.jpg" alt="" />
                    </div>
                </div>
                <div class="col-lg-3 col-md-4 col-12">
                    <div class="d-block h-100">
                        <img class="img-fluid img-thumbnail" src="img/prod${product.id}_4.jpg" alt="" />
                    </div>
                </div>
            </div>
        </div>
    `;

	relatedProductsContainer.innerHTML = `
		<div class="col-lg-3 col-md-4 col-12 border p-3">
			<div class="d-block h-100">
				<a href="#" onclick="setProductID(${product.relatedProducts[0].id})">
					<img src="${product.relatedProducts[0].image}" class="card-img-top" alt="${product.relatedProducts[0].title}">
					<div class="card-body">
						<h5 class="card-title">${product.relatedProducts[0].name}</h5>
					</div>
				</a>
			</div>
		</div>
		<div class="col-lg-3 col-md-4 col-12 border p-3">
			<div class="d-blockh-100">
				<a href="#" onclick="setProductID(${product.relatedProducts[1].id})">
					<img src="${product.relatedProducts[1].image}" class="card-img-top" alt="${product.relatedProducts[1].title}">
					<div class="card-body">
						<h5 class="card-title">${product.relatedProducts[1].name}</h5>
					</div>
				</a>
			</div>
		</div>	
	`;
};

//Funcion que se encarga de retornar un fragmento HTML a partir de una cantidad especifica de estrellas.
const starRating = (score) => {
	let html = "";
	for (let i = 0; i < score; i++) {
		html += `<span class="fa fa-star checked"></span>`;
	}
	return html;
};

//Funcion que se encarga de crear los fragmentos HTML correspondientes por cada comentario obtenido a partir de un producto.
//Tambien se obtienen los comentarios generados por el usuario y se muestran en pantalla.
const showProductComments = (product) => {
	let htmlCommentsToAppend = "";
	let userCommentsArray = JSON.parse(localStorage.getItem("userComments")) || [];

	for (comment of product) {
		htmlCommentsToAppend += `
        <div class="col-md-12 rounded border p-0 mb-2">
            <div class="border-bottom p-2">
				<div>${starRating(comment.score)}</div>
                <span class="user-name fw-bold">${comment.user}</span>
                <time class="text-muted float-right">${comment.dateTime}</time>
            </div>
            <div class="p-2">${comment.description}</div>
        </div>
        `;
	}

	userCommentsArray.forEach((userComment) => {
		if (userComment.productId === CURRENT_PRODUCT_ID) {
			htmlCommentsToAppend += `
            <div class="col-md-12 rounded border p-0 mb-2">
                <div class="border-bottom p-2">
					<div>${starRating(userComment.score)}</div>
                    <span class="user-name fw-bold">${localStorage.getItem("userEmail")}</span>
                    <time class="text-muted float-right">${userComment.date.CURRENT_DATE} ${userComment.date.CURRENT_HOURS_MINS_MILISECONDS}</time>
                </div>
                <div class="p-2">${userComment.comment}</div>
            </div>
            `;
		}
	});

	productCommentsContainer.innerHTML = htmlCommentsToAppend;
};

//Funcion que se encarga de guardar los comentarios del usuario en localstorage para posteriormente usar la funcion showProductComments y asi poder mostrarlos.
const saveProductComment = () => {
	let userCommentsArray = JSON.parse(localStorage.getItem("userComments")) || [];

	const getMonthDayYear = () => {
		const date = new Date();
		const day = date.getDate();
		const month = date.getMonth() + 1;
		const year = date.getFullYear();
		return `${year}-${month}-${day}`;
	};

	const userComment = {
		"productId": CURRENT_PRODUCT_ID,
		"comment": commentInput.value,
		"score": ratingInput.value,
		"date": {
			"CURRENT_DATE": getMonthDayYear(),
			"CURRENT_HOURS_MINS_MILISECONDS": String(new Date()).slice(16, 24),
		},
	};

	userCommentsArray.push(userComment);
	localStorage.setItem("userComments", JSON.stringify(userCommentsArray));
};

document.addEventListener("DOMContentLoaded", (e) => {
	document.getElementById("nav-userInfo").innerHTML = localStorage.getItem("userEmail");

	//Obtenemos los datos del producto y lo guardamos en la variable currentProductData.
	getJSONData(CURRENT_PRODUCT).then((resultObj) => {
		if (resultObj.status === "ok") {
			let currentProductData = resultObj.data;

			const currentProductCart = {
				"id": currentProductData.id,
				"name": currentProductData.name,
				"count": 1,
				"unitCost": currentProductData.cost,
				"currency": currentProductData.currency,
				"image": currentProductData.images[0],
			};

			if (productsOnStorage.find((product) => product.id === currentProductCart.id)) {
				btnBuy.textContent = "Remover del Carrito";
				btnBuy.classList.add("bg-danger");
			} else {
				btnBuy.textContent = "Agregar al Carrito";
				btnBuy.classList.add("bg-success");
			}

			btnBuy.addEventListener("click", (e) => {
				btnBuy.classList.toggle("bg-danger");
				btnBuy.classList.toggle("bg-success");

				if (productsOnStorage.find((product) => product.id === currentProductCart.id)) {
					productsOnStorage = productsOnStorage.filter((item) => item.id != currentProductCart.id);
					localStorage.setItem("productsOnCart", JSON.stringify(productsOnStorage));
					btnBuy.textContent = "Agregar al Carrito";
				} else {
					productsOnStorage = [currentProductCart, ...productsOnStorage];
					localStorage.setItem("productsOnCart", JSON.stringify(productsOnStorage));
					btnBuy.textContent = "Remover del Carrito";
				}
			});

			showProductData(currentProductData);
		}
	});

	//Obtenemos los comentarios del producto y lo guardamos en la variable currentProductComments.
	getJSONData(CURRENT_PRODUCT_COMMENTS).then((resultObj) => {
		if (resultObj.status === "ok") {
			let currentProductComments = resultObj.data;
			showProductComments(currentProductComments);
		}
	});

	btnSendComment.addEventListener("click", saveProductComment);
});
