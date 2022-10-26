document.getElementById("nav-userInfo").innerHTML = localStorage.getItem("userEmail");

document.getElementById("closeSession").addEventListener("click", () => {
	localStorage.removeItem("userEmail");
	window.location.replace("./index.html");
});
