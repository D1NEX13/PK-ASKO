export interface IProductsResponse {
	data: Product[];
	total: number;
	page: number;
	limit: number;
}

export interface Product {
	id: number;
	name: string;
	slug: string;
	article: string;
	price: number;
	description?: string;
	weight?: number;
	length?: number;
	width?: number;
	height?: number;
	inStock: boolean;
	quantity: number;
	images?: string[];
	partType?: string;
	sortOrder: number;
	createdAt: string;
	updatedAt: string;
	categoryId?: number;
}
