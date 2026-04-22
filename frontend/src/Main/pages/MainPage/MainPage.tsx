import type { ReactNode } from 'react'
import Slider from './components/Slider/Slider'
import Catalog from './components/Catalog/Catalog'
import Title from 'antd/es/typography/Title'
import './MainPage.scss'
import { Button } from 'antd'

function MainPage(): ReactNode {
  return (
    <>
      <Slider />
      <Title className="title">Каталог продукции</Title>
      <Catalog />
      <Button className="button" size="large">
        Смотреть весь каталог
      </Button>
      <div>YoungRussia</div>
    </>
  )
}

export default MainPage
