export interface ICategory {
	id: number;
	name: string;
	slug: string;
	parentId: number | null;
	sortOrder: number;
	imageUrl: string | null;
	children?: ICategory[];
}
