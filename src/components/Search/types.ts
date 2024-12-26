import { ChangeEvent } from 'react'

export interface SearchProps {
  toolName: string
  onChangeValue: (event: ChangeEvent<HTMLInputElement>) => void
}
