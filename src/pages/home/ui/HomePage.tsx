// src/pages/home/ui/HomePage.tsx

import './HomePage.scss'
import { useTranslation } from 'react-i18next'
import { AdsFeed } from '@/features/ad/ui/AdsFeed'

const HomePage = () => {
  const { t } = useTranslation()

  return (
    <div className="home-page">
      <h1>{t('home.title')}</h1>
      <p>{t('home.subtitle')}</p>
      <AdsFeed />
    </div>
  )
}

export default HomePage