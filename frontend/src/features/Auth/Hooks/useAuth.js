import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearAuthError, loginUser, logoutUser, refreshSession, registerUser } from '../State/authSlice'

export function useAuth() {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  const login = useCallback((payload) => dispatch(loginUser(payload)).unwrap(), [dispatch])
  const register = useCallback((payload) => dispatch(registerUser(payload)).unwrap(), [dispatch])
  const refresh = useCallback(() => dispatch(refreshSession()).unwrap(), [dispatch])
  const logout = useCallback(() => dispatch(logoutUser()).unwrap(), [dispatch])
  const clearError = useCallback(() => dispatch(clearAuthError()), [dispatch])
  return {
    ...auth,
    login,
    register,
    refresh,
    logout,
    clearError,
  }
}
