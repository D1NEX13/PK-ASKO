import { FilterOutlined } from '@ant-design/icons';
import { Card, Checkbox, Flex, InputNumber, Radio, Select } from 'antd';
import type { ReactNode } from 'react';
import type { ICategory } from '../../../../../Shared/types/category';

const PART_TYPES = ['Вал', 'Втулка', 'Гайка', 'Кронштейн', 'Палец', 'Фланец'];

export interface IFilters {
	categoryId?: number;
	minPrice?: number;
	maxPrice?: number;
	partTypes: string[];
	inStock?: 'true' | 'false' | undefined;
}

interface FiltersPanelProps {
	categories: ICategory[];
	filters: IFilters;
	onChange: (filters: IFilters) => void;
}

function FiltersPanel({ categories, filters, onChange }: FiltersPanelProps): ReactNode {
	const categoryOptions = categories.map((cat) => ({
		value: cat.id,
		label: cat.name,
	}));

	return (
		<Card style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
			<Flex
				vertical
				gap={24}
			>
				{/* Заголовок */}
				<Flex
					align="center"
					gap={8}
				>
					<FilterOutlined />
					<span style={{ fontWeight: 700, fontSize: 16 }}>Фильтры</span>
				</Flex>

				{/* Категория */}
				<Flex
					vertical
					gap={8}
				>
					<span style={{ fontWeight: 600 }}>Техника / Раздел</span>
					<Select
						allowClear
						placeholder="Все категории"
						options={categoryOptions}
						value={filters.categoryId}
						onChange={(val) => onChange({ ...filters, categoryId: val })}
					/>
				</Flex>

				{/* Цена */}
				<Flex
					vertical
					gap={8}
				>
					<span style={{ fontWeight: 600 }}>Цена (₽)</span>
					<Flex
						gap={8}
						align="center"
					>
						<InputNumber
							placeholder="От"
							min={0}
							style={{ flex: 1 }}
							value={filters.minPrice}
							onChange={(val) => onChange({ ...filters, minPrice: val ?? undefined })}
						/>
						<span>-</span>
						<InputNumber
							placeholder="До"
							min={0}
							style={{ flex: 1 }}
							value={filters.maxPrice}
							onChange={(val) => onChange({ ...filters, maxPrice: val ?? undefined })}
						/>
					</Flex>
				</Flex>

				{/* Тип детали */}
				<Flex
					vertical
					gap={8}
				>
					<span style={{ fontWeight: 600 }}>Тип детали</span>
					<Checkbox.Group
						value={filters.partTypes}
						onChange={(vals) => onChange({ ...filters, partTypes: vals as string[] })}
					>
						<Flex
							vertical
							gap={6}
						>
							{PART_TYPES.map((type) => (
								<Checkbox
									key={type}
									value={type}
								>
									{type}
								</Checkbox>
							))}
						</Flex>
					</Checkbox.Group>
				</Flex>

				{/* Наличие */}
				<Flex
					vertical
					gap={8}
				>
					<span style={{ fontWeight: 600 }}>Наличие</span>
					<Radio.Group
						value={filters.inStock ?? 'any'}
						onChange={(e) =>
							onChange({
								...filters,
								inStock: e.target.value === 'any' ? undefined : e.target.value,
							})
						}
					>
						<Flex
							vertical
							gap={6}
						>
							<Radio value="any">Любое</Radio>
							<Radio value="true">В наличии</Radio>
							<Radio value="false">Под заказ</Radio>
						</Flex>
					</Radio.Group>
				</Flex>
			</Flex>
		</Card>
	);
}

export default FiltersPanel;
