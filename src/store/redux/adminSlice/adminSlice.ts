import { createAppSlice } from 'store/createAppSlice'
import {
  SearchUserRequestDto,
  SearchUserResponseDto,
  SearchUserInitialState,
} from './types'

const searchUserDataInitialState: SearchUserInitialState = {
  foundUsers: [],
  isLoading: false,
  error: undefined,
}

export const adminSlice = createAppSlice({
  name: 'ADMIN',
  initialState: searchUserDataInitialState,
  reducers: create => ({
    searchUsers: create.asyncThunk(
      async (searchParams: SearchUserRequestDto, { rejectWithValue }) => {
        try {
          const response = await fetch('/api/users/search', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(searchParams),
          })

          const result = await response.json()

          if (!response.ok) {
            return rejectWithValue(result.message || 'Failed to find user')
          }
          return result as SearchUserResponseDto[]
        } catch (error) {
          return rejectWithValue('An unexpected error occurred')
        }
      },
      {
        pending: (state: SearchUserInitialState) => {
          state.error = undefined
          state.isLoading = true
        },
        fulfilled: (state: SearchUserInitialState, action) => {
          state.isLoading = false
          state.foundUsers = action.payload
        },
        rejected: (state: SearchUserInitialState, action) => {
          state.isLoading = false
          state.error = action.payload as string
        },
      },
    ),
    setUserRole: create.asyncThunk(
      async (
        { userId, role }: { userId: string; role: string },
        { rejectWithValue },
      ) => {
        const response = await fetch(`/api/users/${userId}?role=${role}`, {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        })

        if (!response.ok) {
          const errorData = await response.json()
          return rejectWithValue(errorData)
        }

        return await response.json()
      },
      {
        pending: (state: SearchUserInitialState) => {
          state.isLoading = true
          state.error = undefined
        },
        fulfilled: (state: SearchUserInitialState, action) => {
          state.isLoading = false
          state.foundUsers = state.foundUsers.map(user =>
            user.id === action.payload.id ? action.payload : user,
          )
        },
        rejected: (state: SearchUserInitialState, action) => {
          state.isLoading = false
          state.error = action.payload as string
        },
      },
    ),
    deleteUser: create.asyncThunk(
      async (userId: string, { rejectWithValue }) => {
        const response = await fetch(`/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
          method: 'DELETE',
        })
        const result = await response.json()
        if (!response.ok) {
          return rejectWithValue(result.message || 'Failed to delete user')
        }
        return result
      },
      {
        pending: (state: SearchUserInitialState) => {
          state.isLoading = true
          state.error = undefined
        },
        fulfilled: (state: SearchUserInitialState, action) => {
          state.isLoading = false
          state.foundUsers = state.foundUsers.filter(
            user => user.id !== action.payload.id,
          )
        },
        rejected: (state: SearchUserInitialState, action) => {
          state.isLoading = false
          state.error = action.payload as string
        },
      },
    ),
  }),
  selectors: {
    search_users: (state: SearchUserInitialState) => ({
      foundUsers: state.foundUsers,
      isLoading: state.isLoading,
      error: state.error,
    }),
  },
})

export const adminSliceAction = adminSlice.actions
export const adminSliceSelectors = adminSlice.selectors