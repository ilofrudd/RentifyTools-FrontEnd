import { createAppSlice } from 'store/createAppSlice'
import { CategoriesInitialState, Category } from './types'
import { TOOLS_APP_ROUTES } from 'constants/routes'

const categoryDataInitialState: CategoriesInitialState = {
  categories: [],
  isLoading: false,
  error: undefined,
}

export const categorySlice = createAppSlice({
  name: 'CATEGORIES_DATA',
  initialState: categoryDataInitialState,
  reducers: create => ({
    fetchCategories: create.asyncThunk(
      async (_, { rejectWithValue }) => {
        const response = await fetch(TOOLS_APP_ROUTES.CATEGORIES)
        const result = await response.json()

        if (!response.ok) {
          return rejectWithValue(result.message || 'Error fetching categories')
        }
        return result as Category[]
      },
      {
        pending: (state: CategoriesInitialState) => {
          state.isLoading = true
          state.error = undefined
        },
        fulfilled: (state: CategoriesInitialState, action) => {
          state.isLoading = false
          state.categories = action.payload.map((category: Category) => ({
            ...category,
            image: `data:image/jpeg;base64,${category.image}`,
          }))
          console.log('State:', state.categories)
        },
        rejected: (state: CategoriesInitialState, action) => {
          state.isLoading = false
          state.error = action.payload as string
        },
      },
    ),
  }),
  
  selectors: {
    categories_data: (state: CategoriesInitialState) => state,
  },
})

export const categorySliceAction = categorySlice.actions
export const categorySliceSelectors = categorySlice.selectors