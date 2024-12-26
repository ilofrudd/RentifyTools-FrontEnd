export interface Category {
  id: number
  title: string
  image?: string
}

export interface CategoriesInitialState {
  categories: Category[]
  isLoading: boolean
  error: string | undefined
}