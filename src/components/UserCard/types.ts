import { UserResponseDto } from 'store/redux/userSlice/types'

export interface UserProps {
  userData?: UserResponseDto
  error?: string
  onDelete: () => void
  onUpdate: () => void
}
