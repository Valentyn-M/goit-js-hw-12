import { showGallery } from "./js/render-functions"
import { getImagesPixabay } from "./js/pixabay-api"
import iziToast from "izitoast";

let searchRequest;

// Show images via form
const searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", (event) => {
	event.preventDefault();

	// Get Search request
	const inputSearch = searchForm.elements.search;
	const inputSearchValue = inputSearch.value.trim();

	// If the Search request is empty
	if (inputSearchValue === "") {
		return iziToast.warning({
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

	// If this is the same Search request
	if (inputSearchValue === searchRequest) {
		return iziToast.warning({
			class: "caution",
			titleColor: "#fff",
			titleSize: "16px",
			titleLineHeight: "1.5",
			message: "Results for this Search query are already shown",
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
	searchRequest = inputSearchValue;

	// Get images
	getImagesPixabay(searchRequest, true).then((images) => {
		// Show images
		showGallery(images, true);
	})
})

// Show images via Button "Load more"
const loadMoreBtn = document.querySelector(".gallery__btn-more");
loadMoreBtn.addEventListener("click", () => {
	// Get images
	getImagesPixabay(searchRequest, false).then((images) => {
		// If there is no data
		if (!images) {
			return;
		}

		// Show images
		showGallery(images, false);

		// Page scrolling
		const galleryElement = document.querySelector(".gallery__item");
		const hightGalleryElement = galleryElement.getBoundingClientRect().height;

		window.scrollBy({
			top: (hightGalleryElement * 2),
			left: 0,
			behavior: "smooth",
		});
	})
})
