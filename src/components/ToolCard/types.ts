export interface UserTool {
  firstname: string
  lastname: string
  phone?: string
}

export interface CardProps {
  id: string
  userTool?: UserTool | null
  imageUrls?: string[]
  title: string | null
  price: string | null
  status?: string | null
  description: string | null
  isMyAdvert?: boolean
}
