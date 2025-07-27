// src/shared/lib/RequireAuth.tsx

import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useCurrentUser } from '@/features/auth/lib/useCurrentUser'

interface Props {
  children: ReactNode
}

export const RequireAuth = ({ children }: Props) => {
  const { user, loading } = useCurrentUser()

  if (loading) return null
  if (!user) return <Navigate to="/auth/login" replace />
  return <>{children}</>
}