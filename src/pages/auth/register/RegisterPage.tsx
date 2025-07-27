// src/pages/auth/register/RegisterPage.tsx

import './RegisterPage.scss'
import { useTranslation } from 'react-i18next'
import { RegisterForm } from '@/features/auth/ui/RegisterForm'
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className="register-page">
      <div className="register-card">
        <button className="close-button" type="button" onClick={() => navigate('/')}>
          &times;
        </button>

        <div className="register-info">
          <h1>{t('register.welcome')}</h1>
          <p>{t('register.subtitle')}</p>
          <img
            src="/illustration.svg"
            alt="welcome"
            className="register-illustration"
          />
        </div>
        <div className="register-form-wrapper">
          <RegisterForm />
        </div>
      </div>
    </div>
  )
}

export default RegisterPage