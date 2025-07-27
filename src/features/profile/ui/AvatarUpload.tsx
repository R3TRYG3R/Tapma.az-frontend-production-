// src/features/profile/ui/AvatarUpload.tsx

import './AvatarUpload.scss'
import { useTranslation } from 'react-i18next'
import { useUploadAvatar } from '../lib/useUploadAvatar'
import { toast } from 'react-toastify'

interface Props {
  userId: number
  onUploadSuccess?: () => void
}

const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']

export const AvatarUpload = ({ userId, onUploadSuccess }: Props) => {
  const { t } = useTranslation()
  const { uploadAvatar, loading, error } = useUploadAvatar()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''

    if (!file) return

    const maxSize = 5 * 1024 * 1024
    if (!allowedTypes.includes(file.type)) {
      toast.error(t('profile.error_invalid_type'))
      return
    }

    if (file.size > maxSize) {
      toast.error(t('profile.error_file_too_large'))
      return
    }

    await uploadAvatar(userId, file)

    if (!error) {
      toast.success(t('profile.upload_success'))
      onUploadSuccess?.()
    } else {
      toast.error(t(`auth.${error}`) || t('auth.unknown_error'))
    }
  }

  return (
    <div className="avatar-upload">
      <label className="button button--primary" style={{ width: '260px', height: '40px' }}>
        {t('profile.upload_avatar')}
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.gif,image/jpeg,image/png,image/gif"
          onChange={handleFileChange}
          disabled={loading}
          hidden
        />
      </label>
    </div>
  )
}