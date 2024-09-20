export const getImagesPixabay = (searchRequest) => {

	const loader = document.querySelector(".loader__overlay");
	loader.classList.add("active");

	const searchParams = new URLSearchParams({
		key: "1888761-41f12aec6f7b50c314bb89730",
		q: searchRequest,
		image_type: "photo",
		orientation: "horizontal",
		safesearch: "true"
	});

	return fetch(`https://pixabay.com/api/?${searchParams}`)
		.then((response) => {
			if (!response.ok) {
				throw new Error(response.status);
			}
			return response.json();
		})
		.then((data) => {
			return data.hits;	// return array of objects with images
		})
		.catch((error) => {
			console.log(error);
			return [];
		})
		.finally(() => {
			loader.classList.remove("active");
		});
}
