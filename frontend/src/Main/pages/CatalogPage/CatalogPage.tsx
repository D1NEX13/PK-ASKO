import { Breadcrumb, Col, Flex, Input, Row, Select, Typography } from 'antd';
import { useEffect, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { ICategory } from '../../../Shared/types/category';
import type { Product } from '../../../Shared/types/product';
import FiltersPanel, { type IFilters } from './components/FiltersPanel/FiltersPanel';
import ProductCard from './components/ProductCard/ProductCard';

const API_URL = 'http://localhost:3000';

const SORT_OPTIONS = [
	{ value: 'createdAt_DESC', label: 'По умолчанию' },
	{ value: 'price_ASC', label: 'Цена: по возрастанию' },
	{ value: 'price_DESC', label: 'Цена: по убыванию' },
	{ value: 'name_ASC', label: 'Название: А-Я' },
];

function CatalogPage(): ReactNode {
	const [products, setProducts] = useState<Product[]>([]);
	const [categories, setCategories] = useState<ICategory[]>([]);
	const [search, setSearch] = useState('');
	const [sort, setSort] = useState('createdAt_DESC');
	const [filters, setFilters] = useState<IFilters>({ partTypes: [] });

	const selectedCategory = categories.find((c) => c.id === filters.categoryId);

	useEffect(() => {
		fetch(`${API_URL}/categories`)
			.then((r) => r.json())
			.then((data: ICategory[]) => setCategories(Array.isArray(data) ? data : []))
			.catch(console.error);
	}, []);

	useEffect(() => {
		const [sortBy, sortOrder] = sort.split('_');
		const params = new URLSearchParams();

		if (search) params.set('search', search);
		if (filters.categoryId) params.set('categoryId', String(filters.categoryId));
		if (filters.minPrice != null) params.set('minPrice', String(filters.minPrice));
		if (filters.maxPrice != null) params.set('maxPrice', String(filters.maxPrice));
		if (filters.partTypes.length === 1) params.set('partType', filters.partTypes[0]);
		if (filters.inStock) params.set('inStock', filters.inStock);
		params.set('sortBy', sortBy);
		params.set('sortOrder', sortOrder);
		params.set('limit', '24');

		const controller = new AbortController();
		fetch(`${API_URL}/products?${params.toString()}`, { signal: controller.signal })
			.then((r) => r.json())
			.then((data) => setProducts(Array.isArray(data.items) ? data.items : []))
			.catch((e) => {
				if (e.name !== 'AbortError') console.error(e);
			});

		return () => controller.abort();
	}, [search, sort, filters]);

	return (
		<Flex
			vertical
			style={{ padding: '24px 96px', width: '100%' }}
			gap={24}
		>
			<div>
				<Breadcrumb
					items={[
						{ title: <Link to="/">Главная</Link> },
						{ title: <Link to="/catalog">Каталог</Link> },
						...(selectedCategory ? [{ title: selectedCategory.name }] : []),
					]}
				/>
				<Typography.Title
					level={2}
					style={{ margin: '8px 0 0' }}
				>
					{selectedCategory ? selectedCategory.name.toUpperCase() : 'КАТАЛОГ ПРОДУКЦИИ'}
				</Typography.Title>
			</div>

			<Flex
				gap={24}
				align="flex-start"
			>
				<div style={{ flexShrink: 0, width: 280 }}>
					<FiltersPanel
						categories={categories}
						filters={filters}
						onChange={setFilters}
					/>
				</div>
				<Flex
					vertical
					gap={16}
					style={{ flex: 1 }}
				>
					<Flex
						gap={16}
						align="center"
					>
						<Input.Search
							placeholder="Поиск по названию, артикулу, тегу..."
							style={{ flex: 1 }}
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							allowClear
						/>
						<Flex
							align="center"
							gap={8}
							style={{ flexShrink: 0 }}
						>
							<span>Сортировка:</span>
							<Select
								options={SORT_OPTIONS}
								value={sort}
								onChange={setSort}
								style={{ width: 220 }}
							/>
						</Flex>
					</Flex>
					<Row gutter={[16, 16]}>
						{products.map((product) => (
							<Col
								key={product.id}
								xs={24}
								sm={12}
								lg={8}
							>
								<ProductCard product={product} />
							</Col>
						))}
						{products.length === 0 && (
							<Col span={24}>
								<Flex
									justify="center"
									style={{ padding: 48, color: '#aaa' }}
								>
									Товары не найдены
								</Flex>
							</Col>
						)}
					</Row>
				</Flex>
			</Flex>
		</Flex>
	);
}

export default CatalogPage;
