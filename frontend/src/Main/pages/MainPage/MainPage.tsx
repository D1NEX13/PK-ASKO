import type { ReactNode } from 'react';
import Slider from './components/Slider/Slider';
import Catalog from './components/Catalog/Catalog';
import Title from 'antd/es/typography/Title';
import './MainPage.scss';
import { Button } from 'antd';
import Services from './components/Services/Services';
import About from './components/About/About';
import FAQ from './components/FAQ/FAQ';
import Map from './components/Map/Map';

function MainPage(): ReactNode {
	return (
		<>
			<Slider />
			<Title className="title">КАТАЛОГ ПРОДУКЦИИ</Title>
			<Catalog />
			<Button
				className="button"
				size="large"
			>
				Смотреть весь каталог
			</Button>
			<Title className="title">НАШИ УСЛУГИ</Title>
			<Services />
			<Title className="title">О КОМПАНИИ ПК АСКО</Title>
			<About />
			<Title className="title">ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ</Title>
			<FAQ />
			<Title className="title">Наше местоположение</Title>
			<Map />
		</>
	);
}

export default MainPage;
