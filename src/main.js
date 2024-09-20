import { showGallery } from "./js/render-functions"
import { getImagesPixabay } from "./js/pixabay-api"
import iziToast from "izitoast";

const searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", (event) => {
	event.preventDefault();

	const inputSearch = searchForm.elements.search;
	const inputSearchValue = inputSearch.value.trim();

	// If the search request is empty
	if (inputSearchValue === "") {
		return iziToast.show({
			class: "caution",
			titleColor: "#fff",
			titleSize: "16px",
			titleLineHeight: "1.5",
			message: "Fill please all fields",
			backgroundColor: "#ffa000",
			color: "white",
			messageColor: "#fff",
			messageSize: "16px",
			messageLineHeight: "1.5",
			iconUrl: new URL("./img/alert.svg", import.meta.url).href,
			iconColor: "#fff",
			close: true,
			closeOnEscape: true,
			progressBarColor: "#ffe0ac",
			position: "topRight",
			timeout: 3000,
			animateInside: false,
			transitionIn: "bounceInLeft"
		});
	}

	getImagesPixabay(inputSearchValue).then((images) => {
		showGallery(images)
	});
})