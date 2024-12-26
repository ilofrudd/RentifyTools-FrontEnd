export interface MessageModalProps {
  isOpen: boolean
  onClose: () => void
  recipientName: string
  recipientEmail: string
  senderName: string
  senderEmail: string
}
