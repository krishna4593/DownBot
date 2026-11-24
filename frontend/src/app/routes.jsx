import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router'
import { refreshSession } from '../features/Auth/State/authSlice'
import LoginPage from '../features/Auth/UI/pages/LoginPage'
import RegisterPage from '../features/Auth/UI/pages/RegisterPage'
import ProfilePage from '../features/Auth/UI/pages/ProfilePage'

function PublicRoute() {
  const dispatch = useDispatch()
  const { accessToken, status } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!accessToken && status === 'idle') {
      dispatch(refreshSession())
    }
  }, [accessToken, dispatch, status])

  if (accessToken) return <Navigate to="/profile" replace />
  if (status === 'loading') {
    return (
      <main className="grid min-h-screen place-items-center bg-white text-sm text-slate-500 dark:bg-[#0b0f17] dark:text-slate-400">
        Restoring your session...
      </main>
    )
  }
  return <Outlet />
}

function ProtectedRoute() {
  const dispatch = useDispatch()
  const location = useLocation()
  const { accessToken, status } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!accessToken && status === 'idle') {
      dispatch(refreshSession())
    }
  }, [accessToken, dispatch, status])

  if (accessToken) return <Outlet />
  if (status === 'loading') {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f7f8fa] text-sm text-slate-500 dark:bg-[#0b0f17] dark:text-slate-400">
        Restoring your workspace...
      </main>
    )
  }
  return <Navigate to="/login" replace state={{ from: location.pathname }} />
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
