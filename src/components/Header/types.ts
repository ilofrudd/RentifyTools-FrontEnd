import { ChangeEvent } from 'react'

export interface AppHeaderProps {
  isLogin: boolean
  toolName: string
  onChangeValue: (event: ChangeEvent<HTMLInputElement>) => void
  onSearch: () => void
}
