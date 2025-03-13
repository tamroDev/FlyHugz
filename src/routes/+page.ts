import type { PageLoad } from './$types';
import type { IProduct } from '$lib/schemes/product.type';
import type { ISlide } from '$lib/schemes/slide.type';

export const load: PageLoad = async ({ fetch }) => {
	try {
		const [productsRes, slidesRes] = await Promise.all([
			fetch('http://localhost:5000/products'),
			fetch('http://localhost:5000/slides')
		]);

		if (!productsRes.ok) {
			throw new Error(`Lỗi HTTP từ products! trạng thái: ${productsRes.status}`);
		}

		// Kiểm tra phản hồi từ API danh mục
		if (!slidesRes.ok) {
			throw new Error(`Lỗi HTTP từ categories! trạng thái: ${slidesRes.status}`);
		}
		const slides = (await slidesRes.json()) as ISlide[];
		const products = (await productsRes.json()) as IProduct[];

		return { products, slides };
	} catch (error) {
		console.error('Không thể tải sản phẩm:', error);
		return {
			products: [],
			slides: [],
			error: error instanceof Error ? error.message : 'Lỗi không xác định'
		};
	}
};
