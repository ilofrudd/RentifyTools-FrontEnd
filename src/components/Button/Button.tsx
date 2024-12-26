import { ButtonProps } from './types'
import { ButtonComponent } from './styles'

function Button({
  type = 'button',
  name,
  onClick,
  disabled,
  isTransparent = false,
}: ButtonProps) {
  return (
    <ButtonComponent
      $isTransparent={isTransparent}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {name}
    </ButtonComponent>
  )
}

export default Button
