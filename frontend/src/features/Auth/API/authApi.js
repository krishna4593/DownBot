import axios from 'axios'

const api = axios.create({ baseURL: '/api/v1/auth', withCredentials: true })

export async function register(payload) {
  const { data } = await api.post('/register', payload)
  return data
}

export async function login(payload) {
  const { data } = await api.post('/login', payload)
  return data
}

export async function refresh() {
  const { data } = await api.post('/refresh')
  return data
}

export async function logout() {
  const { data } = await api.post('/logout')
  return data
}

export async function getProfile(accessToken) {
  const { data } = await api.get('/me', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  return data
}
