import { createAppSlice } from 'store/createAppSlice'
import { ToolRequestDto, ToolUserResponseDto, ToolInitialState } from './types'
import { PayloadAction } from '@reduxjs/toolkit'

const toolDataInitialState: ToolInitialState = {
  userTools: [],
  initialTools: [],
  tools: [],
  toolObj: undefined,
  isLoading: false,
  isCategoryLoading: false,
  error: undefined,
  favCards: [],
}

const token = localStorage.getItem('accessToken')

export const toolSlice = createAppSlice({
  name: 'TOOLS_DATA',
  initialState: toolDataInitialState,
  reducers: create => ({
    uploadImage: create.asyncThunk(
      async (files: File[], { rejectWithValue }) => {
        const formData = new FormData()
        files.forEach(file => {
          formData.append('images', file)
        })

        const response = await fetch('/api/files/upload', {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
          },
          body: formData,
        })
        if (!response.ok) {
          const result = await response.text()
          return rejectWithValue(result || 'Failed to upload images')
        }
        return await response.json()
      },
      {
        pending: (state: ToolInitialState) => {
          state.isLoading = true
          state.error = undefined
        },
        fulfilled: (state: ToolInitialState, action) => {
          state.isLoading = false
          state.toolObj = {
            ...state.toolObj,
            imageUrls: action.payload,
          }
          state.error = undefined
        },
        rejected: (state: ToolInitialState, action) => {
          state.isLoading = false
          state.error = action.payload as string
        },
      },
    ),

    createTool: create.asyncThunk(
      async (toolData: ToolRequestDto, { rejectWithValue }) => {
        const response = await fetch('/api/tools', {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(toolData),
        })

        const result = await response.json()
        if (!response.ok) {
          return rejectWithValue(result.message || 'Failed to create advert')
        }
        return result as ToolUserResponseDto
      },
      {
        pending: (state: ToolInitialState) => {
          state.toolObj = undefined
          state.error = undefined
          state.isLoading = true
        },
        fulfilled: (state: ToolInitialState, action) => {
          state.isLoading = false
          state.toolObj = action.payload
          state.tools.push(action.payload)
          state.initialTools.push(action.payload)
          state.error = undefined
        },
        rejected: (state: ToolInitialState, action) => {
          state.isLoading = false
          state.error = action.payload as string
        },
      },
    ),

    addToFavorites: create.reducer(
      (state: ToolInitialState, action: PayloadAction<ToolUserResponseDto>) => {
        const tool = action.payload
        const isAlreadyFavorite = state.favCards.some(fav => fav.id === tool.id)

        if (isAlreadyFavorite) {
          state.favCards = state.favCards.filter(fav => fav.id !== tool.id)
        } else {
          state.favCards.push(tool)
        }
      },
    ),

    fetchTool: create.asyncThunk(
      async (id: string, { rejectWithValue }) => {
        const response = await fetch(`/api/tools/${id}`, {
          method: 'GET',
        })

        const result = await response.json()
        if (!response.ok) {
          return rejectWithValue(result.message || 'Failed to fetch tools')
        }
        return result as ToolUserResponseDto
      },
      {
        pending: (state: ToolInitialState) => {
          state.isLoading = true
          state.error = undefined
        },
        fulfilled: (state: ToolInitialState, action) => {
          state.isLoading = false
          state.toolObj = action.payload
          state.error = undefined
        },
        rejected: (state: ToolInitialState, action) => {
          state.isLoading = false
          state.error = action.payload as string
        },
      },
    ),

    fetchTools: create.asyncThunk(
      async (_, { rejectWithValue }) => {
        const response = await fetch('/api/tools', {
          method: 'GET',
        })

        const result = await response.json()
        if (!response.ok) {
          return rejectWithValue(result.message || 'Failed to fetch tools')
        }
        return result as ToolUserResponseDto[]
      },
      {
        pending: (state: ToolInitialState) => {
          state.isLoading = true
          state.error = undefined
        },
        fulfilled: (state: ToolInitialState, action) => {
          state.isLoading = false
          state.tools = action.payload
          state.initialTools = action.payload
          state.error = undefined
        },
        rejected: (state: ToolInitialState, action) => {
          state.isLoading = false
          state.error = action.payload as string
        },
      },
    ),

    fetchToolsByCategory: create.asyncThunk(
      async (id: number, { rejectWithValue }) => {
        const response = await fetch(`/api/tools/category/${id}`)
        const result = await response.json()
        if (!response.ok) {
          return rejectWithValue(
            result.message || 'Error fetching tools by category',
          )
        }
        return result as ToolUserResponseDto[]
      },
      {
        pending: (state: ToolInitialState) => {
          state.isCategoryLoading = true
          state.error = undefined
          state.tools = []
        },
        fulfilled: (state: ToolInitialState, action) => {
          state.isCategoryLoading = false
          state.tools = action.payload
          state.error = undefined
        },
        rejected: (state: ToolInitialState, action) => {
          state.isCategoryLoading = false
          state.error = action.payload as string
        },
      },
    ),

    fetchUserTools: create.asyncThunk(
      async (_, { rejectWithValue }) => {
        const response = await fetch('/api/tools/me', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
          },
        })

        const result = await response.json()
        if (!response.ok) {
          return rejectWithValue(result.message || 'Failed to fetch user tools')
        }
        return result as ToolUserResponseDto[]
      },
      {
        pending: (state: ToolInitialState) => {
          state.isLoading = true
          state.error = undefined
        },
        fulfilled: (state: ToolInitialState, action) => {
          state.isLoading = false
          state.userTools = action.payload
          state.error = undefined
        },
        rejected: (state: ToolInitialState, action) => {
          state.isLoading = false
          state.error = action.payload as string
        },
      },
    ),

    updateToolStatus: create.asyncThunk(
      async (
        { id, status }: { id: string; status: string },
        { rejectWithValue },
      ) => {
        try {
          const response = await fetch(`/api/tools/${id}?status=${status}`, {
            method: 'PATCH',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
            },
          })

          if (!response.ok) {
            const errorResult = await response.json().catch(() => null)
            return rejectWithValue(
              errorResult?.message || 'Failed to update tool status',
            )
          }

          const result = await response.json()

          return result as ToolUserResponseDto
          
        } catch (error) {
          console.error('Update Tool Error: ', error)
          return rejectWithValue('Network error or invalid JSON response')
        }
      },
      {
        pending: (state: ToolInitialState) => {
          state.isLoading = true
          state.error = undefined
        },
        fulfilled: (state: ToolInitialState, action) => {
          state.isLoading = false
          state.error = undefined
          state.tools = state.tools.map(tool =>
            tool.id === action.payload.id
              ? { ...tool, status: action.payload.status }
              : tool,
          )
          state.userTools = state.userTools.map(tool =>
            tool.id === action.payload.id
              ? { ...tool, status: action.payload.status }
              : tool,
          )
        },
        rejected: (state: ToolInitialState, action) => {
          state.isLoading = false
          state.error = action.payload as string
        },
      },
    ),

    updateTool: create.asyncThunk(
      async (toolData: ToolUserResponseDto, { rejectWithValue }) => {
        const sanitizedToolData = {
          ...toolData,
          title: toolData.title || null,
          description: toolData.description || null,
          price: toolData.price || null,
          status: toolData.status || 'AVAILABLE',
        }

        try {
          const response = await fetch(`/api/tools/${sanitizedToolData.id}`, {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
            },
            body: JSON.stringify(sanitizedToolData),
          })

          if (!response.ok) {
            const errorResult = await response.json().catch(() => null)
            return rejectWithValue(
              errorResult?.message || 'Failed to update tool',
            )
          }

          const result = await response.json()
          return result as ToolUserResponseDto
        } catch (error) {
          console.error('Update Tool Error: ', error)
          return rejectWithValue('Network error or invalid JSON response')
        }
      },
      {
        pending: (state: ToolInitialState) => {
          state.isLoading = true
          state.error = undefined
        },
        fulfilled: (state: ToolInitialState, action) => {
          state.isLoading = false
          state.tools = state.tools.map(tool =>
            tool.id === action.payload.id ? action.payload : tool,
          )
          state.error = undefined
        },
        rejected: (state: ToolInitialState, action) => {
          state.isLoading = false
          state.error = action.payload as string
        },
      },
    ),

    deleteTool: create.asyncThunk(
      async (id: string, { rejectWithValue }) => {
        const response = await fetch(`/api/tools/${id}`, {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
          },
        })

        if (!response.ok) {
          const result = await response.json()
          return rejectWithValue(result.message || 'Failed to delete tool')
        }
        return id
      },
      {
        pending: (state: ToolInitialState) => {
          state.isLoading = true
          state.error = undefined
        },
        fulfilled: (state: ToolInitialState, action) => {
          state.isLoading = false
          state.tools = state.tools.filter(tool => tool.id !== action.payload)
          state.userTools = state.userTools.filter(
            tool => tool.id !== action.payload,
          )
          state.error = undefined
        },
        rejected: (state: ToolInitialState, action) => {
          state.isLoading = false
          state.error = action.payload as string
        },
      },
    ),

    searchTools: create.reducer(
      (
        state: ToolInitialState,
        action: PayloadAction<{ searchTerm: string; city: string }>,
      ) => {
        const { searchTerm, city } = action.payload
        state.tools = state.initialTools.filter(tool => {
          const matchesTitle = tool.title
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
          const matchesCity =
            tool.user?.address?.city?.toLowerCase() === city.toLowerCase()

          if (searchTerm && city) return matchesTitle && matchesCity
          if (searchTerm) return matchesTitle
          if (city) return matchesCity

          return true
        })
      },
    ),
  }),
  selectors: {
    tools_data: (state: ToolInitialState) => ({
      tools: state.tools,
      isLoading: state.isLoading,
      isCategoryLoading: state.isCategoryLoading,
      error: state.error,
      favCards: state.favCards,
    }),

    toolObj_data: (state: ToolInitialState) => ({
      toolObj: state.toolObj,
      isLoading: state.isLoading,
      error: state.error,
    }),

    userTools_data: (state: ToolInitialState) => ({
      userTools: state.userTools,
      isLoading: state.isLoading,
      error: state.error,
    }),
  },
})

export const toolSliceAction = toolSlice.actions
export const toolSliceSelectors = toolSlice.selectors