import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as authApi from '../API/authApi'

export const registerUser = createAsyncThunk('auth/register', async (payload, { rejectWithValue }) => {
  try { return await authApi.register(payload) }
  catch (error) { return rejectWithValue(error.response?.data || { success: false, message: 'Registration failed', errors: [] }) }
})

export const loginUser = createAsyncThunk('auth/login', async (payload, { rejectWithValue }) => {
  try { return await authApi.login(payload) }
  catch (error) { return rejectWithValue(error.response?.data || { success: false, message: 'Login failed', errors: [] }) }
})

export const refreshSession = createAsyncThunk('auth/refresh', async (_, { rejectWithValue }) => {
  try { return await authApi.refresh() }
  catch (error) { return rejectWithValue(error.response?.data || { success: false, message: 'Session expired', errors: [] }) }
})

export const logoutUser = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try { return await authApi.logout() }
  catch (error) { return rejectWithValue(error.response?.data || { success: false, message: 'Logout failed', errors: [] }) }
})

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, accessToken: null, status: 'idle', error: null },
  reducers: { clearAuthError: (state) => { state.error = null } },
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
        state.accessToken = null
      })
      .addMatcher((action) => action.type.endsWith('/pending'), (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addMatcher((action) => action.type.endsWith('/fulfilled'), (state, action) => {
        state.status = 'succeeded'
        if (action.payload?.data?.accessToken) {
          state.accessToken = action.payload.data.accessToken
          state.user = action.payload.data.user
        }
      })
      .addMatcher((action) => action.type.endsWith('/rejected'), (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

export const { clearAuthError } = authSlice.actions
export default authSlice.reducer
