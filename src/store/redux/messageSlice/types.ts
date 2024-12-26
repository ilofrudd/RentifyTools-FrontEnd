export interface MessageRequest {
  senderName: string
  senderEmail: string
  recipientName: string
  recipientEmail: string
  message: string
}

export interface MessageInitialState {
  isLoading: boolean
  success: boolean | undefined
  error: string | undefined
}