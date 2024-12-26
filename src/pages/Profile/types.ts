import { Key } from 'readline'

export interface UserCardProps {
  description: string | undefined
  price: string
  title: string
  imageUrl: string | undefined
  id: Key | null | undefined
  firstname: string
  lastname: string
  email: string
  password: string
  phone: string
}
