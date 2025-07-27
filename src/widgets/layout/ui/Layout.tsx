// src/widgets/layout/ui/Layout.tsx

import { FC, ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { Header } from '@/widgets/header/ui/Header'
import { Footer } from '@/widgets/footer/ui/Footer'
import { Container } from '@/shared/ui/container/Container'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface LayoutProps {
  children: ReactNode
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation()
  const isAuthPage = pathname.startsWith('/auth/')

  return (
    <div className={`layout ${isAuthPage ? 'auth-layout' : 'default-layout'}`}>
      {!isAuthPage && <Header />}
      <main className="layout-main">
        {isAuthPage ? (
          <div className="auth-layout-wrapper">{children}</div>
        ) : (
          <Container>{children}</Container>
        )}
      </main>
      {!isAuthPage && <Footer />}

      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
        theme="colored"
        pauseOnHover={false}
        closeOnClick
      />
    </div>
  )
}