import { Address } from '../addressSlice/types'

export interface ToolRequestDto {
  title: string
  description: string
  price: string
  imageUrls?: string[]
  status: string
  categoryIds: number[]
}

export interface User {
  firstname: string
  lastname: string
  email: string
  phone?: string
  address: Address
}

export interface ToolUserResponseDto {
  id: string
  title: string
  description: string
  status: string
  imageUrls: string[]
  price: string
  user?: User
}

export interface ToolInitialState {
  tools: ToolUserResponseDto[]
  userTools: ToolUserResponseDto[]
  toolObj: Partial<ToolUserResponseDto> | undefined
  initialTools: ToolUserResponseDto[]
  isLoading: boolean
  isCategoryLoading: boolean
  error: string | undefined
  favCards: ToolUserResponseDto[]
}