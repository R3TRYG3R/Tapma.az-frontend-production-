// src/features/profile/ui/AvatarRemove.tsx

import './AvatarRemove.scss'
import { useTranslation } from 'react-i18next'
import { useRemoveAvatar } from '../lib/useRemoveAvatar'
import { toast } from 'react-toastify'

interface Props {
  userId: number
  onRemoveSuccess?: () => void
}

export const AvatarRemove = ({ userId, onRemoveSuccess }: Props) => {
  const { t } = useTranslation()
  const { removeAvatar, loading, error } = useRemoveAvatar()

  const handleRemove = async () => {
    await removeAvatar(userId)
    if (!error) {
      toast.success(t('profile.remove_success'))
      onRemoveSuccess?.()
    } else {
      toast.error(t(`auth.${error}`) || t('auth.unknown_error'))
    }
  }

  return (
    <div className="avatar-remove">
      <button
        onClick={handleRemove}
        disabled={loading}
        className="button button--danger"
        style={{ width: '260px', height: '40px' }}
      >
        {loading ? t('auth.loading') : t('profile.remove_avatar')}
      </button>
    </div>
  )
}