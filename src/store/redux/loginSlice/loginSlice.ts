import { createAppSlice } from 'store/createAppSlice'
import { LoginInitialState, LoginRequestDto } from './types'

const loginDataInitialState: LoginInitialState = {
  user: undefined,
  authData: undefined,
  isLoading: false,
  isAuthenticated: false,
  error: undefined,
}

export const loginSlice = createAppSlice({
  name: 'LOGIN_USER',
  initialState: loginDataInitialState,
  reducers: create => ({
    loginUser: create.asyncThunk(
      async (loginData: LoginRequestDto, { rejectWithValue }) => {
        try {
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData),
          })

          const result = await response.json()
          if (!response.ok) {
            return rejectWithValue(
              result.message || 'Incorrect password or email address',
            )
          }
          return result
        } catch (error) {
          return rejectWithValue('Network error or server is unavailable')
        }
      },
      {
        pending: (state: LoginInitialState) => {
          state.isLoading = true
          state.isAuthenticated = false
          state.error = undefined
        },
        fulfilled: (state: LoginInitialState, action) => {
          localStorage.setItem('accessToken', action.payload.accessToken)
          localStorage.setItem('refreshToken', action.payload.refreshToken)
          state.isLoading = false
          state.isAuthenticated = true
          state.user = action.payload.user
          state.authData = undefined
          state.error = undefined
        },
        rejected: (state: LoginInitialState, action) => {
          state.isLoading = false
          state.isAuthenticated = false
          state.error = action.payload as string
        },
      },
    ),

    logoutUser: create.reducer((state: LoginInitialState) => {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      state.user = undefined
      state.authData = undefined
      state.isAuthenticated = false
      state.error = undefined
    }),

    checkEmail: create.asyncThunk(
      async (loginData: LoginRequestDto, { rejectWithValue }) => {
        try {
          const response = await fetch('/api/users/check-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData),
          })

          const result = await response.json()

          if (!response.ok) {
            return rejectWithValue(result.message || 'Email already exists')
          }

          return loginData
        } catch (error) {
          console.error('Error in checkEmail:', error)
          return rejectWithValue('Network error or server is unavailable')
        }
      },
      {
        pending: (state: LoginInitialState) => {
          state.isLoading = true
          state.authData = undefined
          state.error = undefined
        },
        fulfilled: (state: LoginInitialState, action) => {
          state.isLoading = false
          state.authData = action.payload
          state.error = undefined
        },
        rejected: (state: LoginInitialState, action) => {
          state.isLoading = false
          state.error = action.payload as string
        },
      },
    ),

    getCurrentUser: create.asyncThunk(
      async (_: void, { rejectWithValue }) => {
        const response = await fetch('/api/auth/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
          },
        })

        const result = await response.json()
        if (!response.ok) {
          return rejectWithValue(result.message || 'Failed to register user')
        }
        return result
      },
      {
        pending: (state: LoginInitialState) => {
          state.user = undefined
          state.error = undefined
          state.isLoading = true
        },
        fulfilled: (state: LoginInitialState, action) => {
          state.isLoading = false
          state.user = action.payload
        },
        rejected: (state: LoginInitialState, action) => {
          state.isLoading = false
          state.error = action.payload as string
        },
      },
    ),
  }),

  selectors: {
    login_user: (state: LoginInitialState) => state,
    currentUser: (state: LoginInitialState) => ({
      user: state.user,
      error: state.error,
    }),
  },
})

export const loginSliceAction = loginSlice.actions
export const loginSliceSelectors = loginSlice.selectors
