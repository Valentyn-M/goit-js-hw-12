import { API_KEY, BASE_URL } from "./config"

import iziToast from "izitoast";
import axios from 'axios';

const loadMoreBtn = document.querySelector(".gallery__btn-more");

// Page number
let pageNumber = 1;
// Number of results per page
const resultPerPage = 15;

export const getImagesPixabay = async (searchRequest, isNewSearchRequest) => {

	// Show loader
	const loader = document.querySelector(".gallery__loader-overlay");
	loader.classList.add("_active");

	// Check if this is a new Search Request
	if (isNewSearchRequest) {
		pageNumber = 1;
	}

	// Hide button "Load more" after first request
	if (loadMoreBtn.classList.contains("_active")) {
		loadMoreBtn.classList.remove("_active");
	}

	// Fetch data from the backend
	try {
		// Блок коду, де можуть виникати помилки
		const responseData = await fetchImages(searchRequest);

		// Total number of pages
		const totalPages = Math.ceil(responseData.totalHits / resultPerPage); // totalHits - total number of images (maximum 500)

		// Check the end of the collection to display an Alert
		if (totalPages > 0 && pageNumber >= totalPages) {
			loadMoreBtn.classList.remove("_active");
			loader.classList.remove("_active");
			return iziToast.info({
				class: "info",
				titleColor: "#fff",
				titleSize: "16px",
				titleLineHeight: "1.5",
				message: "We're sorry, but you've reached the end of search results",
				backgroundColor: "#09f",
				color: "white",
				messageColor: "#fff",
				messageSize: "16px",
				messageLineHeight: "1.5",
				iconUrl: new URL("../img/bell.svg", import.meta.url).href,
				iconColor: "#fff",
				close: true,
				closeOnEscape: true,
				progressBarColor: "#b8e3ff",
				position: "topRight",
				timeout: 4000,
				animateInside: false,
				transitionIn: "bounceInLeft"
			});
		}

		// Hide loader
		loader.classList.remove("_active");

		// Increase the group number
		if (totalPages > 1) {
			pageNumber += 1;
		}

		// Show button "Load more" after first request
		if (pageNumber > 1) {
			loadMoreBtn.classList.add("_active");
		}

		return responseData.hits; // return array of objects with images
	}
	catch (error) {
		// Блок коду для обробки помилок, що виникли у блоці try
		console.log(error);
		// При виникнені непередбаченої помилки (наприклад зник інтернет) потрібно сповіщати кристувача
		iziToast.error({
			class: "error",
			titleColor: "#fff",
			titleSize: "16px",
			titleLineHeight: "1.5",
			message: `Something went wrong.<br> ${error}`,
			backgroundColor: "#ef4040",
			color: "white",
			messageColor: "#fff",
			messageSize: "16px",
			messageLineHeight: "1.5",
			iconUrl: new URL("../img/error.svg", import.meta.url).href,
			iconColor: "#fff",
			close: true,
			closeOnEscape: true,
			progressBarColor: "#b51b1b",
			position: "topRight",
			timeout: 5000,
			animateInside: false,
			transitionIn: "bounceInLeft"
		});
		// Hide loader
		loader.classList.remove("_active");
	}
}

// Якщо результат асинхронної функції використовується в іншій асинхронній функції, помилки оброблюються конструкцією try...catch
async function fetchImages(searchRequest) {
	const searchParams = new URLSearchParams({
		key: API_KEY,
		q: searchRequest,
		image_type: "photo",
		orientation: "horizontal",
		safesearch: "true",
		page: pageNumber,
		per_page: resultPerPage,
	});

	const response = await axios.get(`${BASE_URL}?${searchParams}`);
	return response.data;
}