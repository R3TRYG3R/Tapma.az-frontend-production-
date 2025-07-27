// src/pages/auth/login/LoginPage.tsx

import './LoginPage.scss'
import { useTranslation } from 'react-i18next'
import { LoginForm } from '@/features/auth/ui/LoginForm'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className="login-page">
      <div className="login-card">
        <button className="close-button" type="button" onClick={() => navigate('/')}>×</button>

        <div className="login-info">
          <h1>{t('login.welcome')}</h1>
          <p>{t('login.subtitle')}</p>
          <img src="/illustration2.svg" alt="login" className="login-illustration" />
        </div>

        <div className="login-form-wrapper">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

export default LoginPage