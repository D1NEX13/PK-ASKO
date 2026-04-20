import { Outlet } from 'react-router-dom'
import './App.scss'
import { type ReactNode } from 'react'
import Header from '../Shared/Header/Header'
import { ConfigProvider, Layout } from 'antd'

const { Footer } = Layout

function App(): ReactNode {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#F97316',
          colorBgLayout: '#F4F7F8',
          colorText: '#1D2730',
          boxShadow: '0 12px 30px rgba(19, 52, 59, 0.12)',
          borderRadius: 8,
        },
      }}
    >
      <Layout className="app-layout">
        <Header />
        <Outlet />
        <Footer className="app-footer">PK-ASKO Frontend</Footer>
      </Layout>
    </ConfigProvider>
  )
}

export default App
