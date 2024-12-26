import { HTMLInputTypeAttribute, ChangeEvent } from 'react'

export interface InputProps {
  id: string
  name: string
  label?: string
  type?: HTMLInputTypeAttribute | undefined
  placeholder?: string
  disabled?: boolean
  error?: undefined | string
  isSmallInput?: boolean
  value?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}
