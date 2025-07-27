// src/pages/profile/ui/ProfilePage.tsx

import './ProfilePage.scss'
import { useTranslation } from 'react-i18next'
import { useCurrentUser } from '@/features/auth/lib/useCurrentUser'
import { AvatarUpload } from '@/features/profile/ui/AvatarUpload'
import { AvatarRemove } from '@/features/profile/ui/AvatarRemove'
import { useNavigate } from 'react-router-dom'
import { MyAdsList } from '@/features/ad/ui/MyAdsList' 

const ProfilePage = () => {
  const { t } = useTranslation()
  const { user, loading, error } = useCurrentUser()
  const navigate = useNavigate()

  const isUiAvatar = user?.avatarUrl?.includes('ui-avatars.com')
  const isDefaultAvatar = !user?.avatarUrl || isUiAvatar
  const showRemoveButton = !isDefaultAvatar

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
    window.location.reload()
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h1>{t('profile.title')}</h1>
        <p className="profile-subtitle">{t('profile.subtitle')}</p>

        {loading && <p className="profile-loading">{t('auth.loading')}</p>}
        {error && <p className="profile-error">{t(error)}</p>}

        {user && (
          <div className="profile-details">
            <img
              src={user.avatarUrl || '/default-avatar.png'}
              alt="avatar"
              className="profile-avatar"
            />

            <div className="profile-info">
              <p>
                <span>{t('auth.nickname')}:</span> {user.nickname}
              </p>
            </div>

            <AvatarUpload userId={user.id} onUploadSuccess={() => window.location.reload()} />
            {showRemoveButton && (
              <AvatarRemove userId={user.id} onRemoveSuccess={() => window.location.reload()} />
            )}

            <button className="button button--secondary" onClick={handleLogout}>
              {t('auth.logout')}
            </button>
          </div>
        )}
      </div>

      <MyAdsList />
    </div>
  )
}

export default ProfilePage