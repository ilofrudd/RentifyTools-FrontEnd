export interface ToolProps {
  image: string
  title: string
  price: string
  description: string
  status: string
  user_id: string
}

export interface User {
  firstname: string
  lastname: string
  phone?: string
}

export interface PhoneButtonProps {
  user?: User | null
}
