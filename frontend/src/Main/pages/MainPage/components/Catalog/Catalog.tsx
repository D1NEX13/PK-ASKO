import { ShoppingCartOutlined } from '@ant-design/icons'
import { Card, Flex, Typography } from 'antd'
import type { ReactNode } from 'react'
import Flanec from '../../../../../assets/puctures/flanec.jpg'

const { Meta } = Card

function Catalog(): ReactNode {
  return (
    <Flex wrap={true} gap={16} justify="center" style={{ padding: 50 }}>
      <Card
        style={{ width: 350 }}
        hoverable={true}
        cover={<img draggable={false} alt="example" src={Flanec} />}
        actions={[<ShoppingCartOutlined style={{ fontSize: 24 }} />]}
      >
        <Meta
          title="Фланец стальной плоский"
          description={
            <Flex justify="space-between" align="center">
              <Typography.Text strong>1 200 ₽</Typography.Text>
            </Flex>
          }
        />
      </Card>
      <Card
        style={{ width: 350 }}
        hoverable={true}
        cover={<img draggable={false} alt="example" src={Flanec} />}
        actions={[<ShoppingCartOutlined style={{ fontSize: 24 }} />]}
      >
        <Meta
          title="Фланец стальной плоский"
          description={
            <Flex justify="space-between" align="center">
              <Typography.Text strong>1 200 ₽</Typography.Text>
            </Flex>
          }
        />
      </Card>
      <Card
        style={{ width: 350 }}
        hoverable={true}
        cover={<img draggable={false} alt="example" src={Flanec} />}
        actions={[<ShoppingCartOutlined style={{ fontSize: 24 }} />]}
      >
        <Meta
          title="Фланец стальной плоский"
          description={
            <Flex justify="space-between" align="center">
              <Typography.Text strong>1 200 ₽</Typography.Text>
            </Flex>
          }
        />
      </Card>
      <Card
        style={{ width: 350 }}
        hoverable={true}
        cover={<img draggable={false} alt="example" src={Flanec} />}
        actions={[<ShoppingCartOutlined style={{ fontSize: 24 }} />]}
      >
        <Meta
          title="Фланец стальной плоский"
          description={
            <Flex justify="space-between" align="center">
              <Typography.Text strong>1 200 ₽</Typography.Text>
            </Flex>
          }
        />
      </Card>
      <Card
        style={{ width: 350 }}
        hoverable={true}
        cover={<img draggable={false} alt="example" src={Flanec} />}
        actions={[<ShoppingCartOutlined style={{ fontSize: 24 }} />]}
      >
        <Meta
          title="Фланец стальной плоский"
          description={
            <Flex justify="space-between" align="center">
              <Typography.Text strong>1 200 ₽</Typography.Text>
            </Flex>
          }
        />
      </Card>
    </Flex>
  )
}

export default Catalog
