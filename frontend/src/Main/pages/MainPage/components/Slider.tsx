import { Carousel } from 'antd'
import type { ReactNode } from 'react'
import manufacturer1 from '../../../../assets/puctures/manufacture.jpg'
import manufacturer2 from '../../../../assets/puctures/manufacture2.jpg'
import manufacturer3 from '../../../../assets/puctures/manufacture3.jpg'

function Slider(): ReactNode {
  const contentStyle: React.CSSProperties = {
    margin: 0,
    height: '800px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    backgroundSize: 'cover',
  }
  return (
    <Carousel autoplay={{ dotDuration: true }} arrows autoplaySpeed={5000}>
      <div>
        <div style={{ ...contentStyle, backgroundImage: `url(${manufacturer1})` }}></div>
      </div>
      <div>
        <div style={{ ...contentStyle, backgroundImage: `url(${manufacturer2})` }}></div>
      </div>
      <div>
        <div style={{ ...contentStyle, backgroundImage: `url(${manufacturer3})` }}></div>
      </div>
    </Carousel>
  )
}

export default Slider
