import { Address } from '../addressSlice/types'

export interface SearchUserRequestDto {
  lastname?: string
  email?: string
  phone?: string
}

export interface Role {
  id: number
  title: string
}

export interface SearchUserResponseDto {
  id: string
  firstname: string
  lastname: string
  email: string
  phone: string
  address: Address
}

export interface SearchUserInitialState {
  foundUsers: SearchUserResponseDto[]
  isLoading: boolean
  error?: string | undefined
}
