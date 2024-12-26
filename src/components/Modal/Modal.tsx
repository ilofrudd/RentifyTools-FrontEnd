import { ModalProps } from './types'
import { ModalWrapper } from './styles'

function Modal({ children }: ModalProps) {
  return <ModalWrapper>{children}</ModalWrapper>
}

export default Modal
