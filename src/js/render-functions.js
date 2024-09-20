import SimpleLightbox from "simplelightbox";
import iziToast from "izitoast";

export const showGallery = (images) => {
	const galleryList = document.querySelector(".gallery");
	galleryList.innerHTML = "";

	// If no images were found
	if (images.length === 0) {
		return iziToast.show({
			class: "error",
			titleColor: "#fff",
			titleSize: "16px",
			titleLineHeight: "1.5",
			message: "Sorry, there are no images matching your search query. Please try again!",
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
			timeout: 4500,
			animateInside: false,
			transitionIn: "bounceInLeft"
		});
	}

	galleryList.insertAdjacentHTML("beforeend", generateGalleryItems(images));
	function generateGalleryItems(images) {
		return images.map(image => {
			return `
			<li class="gallery__item">
				<a class="gallery__link" href="${image.largeImageURL}">
					<img
						class="gallery__image"
						src="${image.webformatURL}"
						data-source="${image.largeImageURL}"
						alt="${image.tags}"
						width="360"
						height="200"
					/>
					<ul class="gallery__details-list">
						<li class="gallery__details-item">
							<div class="gallery__details-name">Likes</div>
							<div class="gallery__details-value">${image.likes}</div>
						</li>
						<li class="gallery__details-item">
							<div class="gallery__details-name">Views</div>
							<div class="gallery__details-value">${image.views}</div>
						</li>
						<li class="gallery__details-item">
							<div class="gallery__details-name">Comments</div>
							<div class="gallery__details-value">${image.comments}</div>
						</li>
						<li class="gallery__details-item">
							<div class="gallery__details-name">Downloads</div>
							<div class="gallery__details-value">${image.downloads}</div>
						</li>
					</ul>
				</a>
			</li>
		`;
		}).join("");
	}

	// ==========================================================================================================================

	let gallery = new SimpleLightbox(".gallery__link", {
		captions: true,
		captionSelector: ".gallery__image",
		captionType: "attr",
		captionsData: "alt",
		captionPosition: "bottom",
		captionDelay: 250,
	});
	gallery.refresh();
}