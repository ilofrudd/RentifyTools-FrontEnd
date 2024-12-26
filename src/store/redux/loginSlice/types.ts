export interface LoginRequestDto {
  email: string
  password: string
}

export interface LoginInitialState {
  user: UserResponseDto | undefined
  authData: LoginRequestDto | undefined
  isLoading: boolean
  isAuthenticated: boolean
  error: string | undefined
}

export interface UserResponseDto {
  id: string
  firstname: string
  lastname: string
  email: string
  phone: string
  address: Address
  roles: Role[]
}

export interface Address {
  country: string
  zipCode: string
  city: string
  street: string
}
export interface Role {
  id: number
  title: string
}
