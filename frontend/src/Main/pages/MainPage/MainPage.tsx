import type { ReactNode } from 'react';
import Slider from './components/Slider/Slider';
import Catalog from './components/Catalog/Catalog';
import Title from 'antd/es/typography/Title';
import './MainPage.scss';
import { Button } from 'antd';
import Services from './components/Services/Services';
import About from './components/About/About';

function MainPage(): ReactNode {
	return (
		<>
			<Slider />
			<Title className="title">Каталог продукции</Title>
			<Catalog />
			<Button
				className="button"
				size="large"
			>
				Смотреть весь каталог
			</Button>
			<Title className="title">Наши услуги</Title>
			<Services />
			<Title className="title">О компании ПК АСКО</Title>
			<About />
		</>
	);
}

export default MainPage;
