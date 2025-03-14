// // import type { PageLoad } from './$types';
// // import type { IProduct } from '$lib/schemes/product.type';
// // import type { ISlide } from '$lib/schemes/slide.type';
// // import type { IReview } from '$lib/schemes/review.type';
// import { STORE_ID, DOMAIN_ID, BACKEND_ENDPOINT } from "$env/static/private";




// export const load = async () => {
// 	try {
// 	// const [productsRes, slidesRes,reviewsRes] = await Promise.all([
// 	// 		fetch('http://localhost:5000/products'),
// 	// 		fetch('http://localhost:5000/slides'),
// 	// 		fetch('http://localhost:5000/reviews')
// 	// 	]);

// 	// 	if (!productsRes.ok) {
// 	// 		throw new Error(`Lỗi HTTP từ products! trạng thái: ${productsRes.status}`);
// 	// 	}

// 	// 	if (!slidesRes.ok) {
// 	// 		throw new Error(`Lỗi HTTP từ slides! trạng thái: ${slidesRes.status}`);
// 	// 	}

// 	// 	if(!reviewsRes.ok) {
// 	// 		throw new Error(`Lỗi HTTP từ reviews! trạng thái: ${reviewsRes.status}`);
// 	// 	}
// 		// const slides = (await slidesRes.json()) as ISlide[];
// 		// const products = (await productsRes.json()) as IProduct[];
// 		// const reviews = (await reviewsRes.json()) as IReview[];

// 		const data = await fetch(`${BACKEND_ENDPOINT}/${STORE_ID}/catalogs?page_size=8`, {
// 			method: "GET",
// 			headers: {
// 				"Content-Type": "application/json",
// 				"X-DOMAIN_ID": DOMAIN_ID
// 			}
// 		});

// 		// products, slides,reviews, 
// 			return { data: await data.json(),};
// 	} catch (error) {
// 		console.error('Không thể tải sản phẩm:', error);
// 		return {
// 			products: [],
// 			slides: [],
// 			error: error instanceof Error ? error.message : 'Lỗi không xác định'
// 		};
// 	}
// };

import { STORE_ID, DOMAIN_ID, BACKEND_ENDPOINT } from "$env/static/private";


export const load = async () => {
	const data = await fetch(`${BACKEND_ENDPOINT}/${STORE_ID}/catalogs?page_size=8`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"X-DOMAIN_ID": DOMAIN_ID
		}
	});

	return {
		data: await data.json()
	};
};