// src/features/auth/ui/RegisterForm.tsx

import { useState } from 'react'
import { useRegister } from '@/features/auth/lib/useRegister'
import { useTranslation } from 'react-i18next'
import './RegisterForm.scss'
import { toast } from 'react-toastify'

export const RegisterForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const { register, loading, error } = useRegister()
  const { t } = useTranslation()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    register(email, password, nickname).catch(err => {
      const key = err.message.toLowerCase().replace(/[^a-z0-9]+/g, '_')
      toast.error(t(`auth.${key}`) || t('auth.unknown_error'))
    })
  }

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h2>{t('auth.create_account')}</h2>

      <input
        type="text"
        placeholder={t('auth.nickname')}
        value={nickname}
        onChange={e => setNickname(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder={t('auth.email')}
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder={t('auth.password')}
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="button button--primary"
      >
        {loading ? t('auth.loading') : t('auth.register')}
      </button>
    </form>
  )
}