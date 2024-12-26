import { InputProps } from './types'
import {
  InputWrapper,
  InputComponent,
  InputLabel,
  ErrorContainer,
} from './styles'

function Input({
  id,
  name,
  label,
  type = 'text',
  placeholder,
  disabled = false,
  error = undefined,
  value,
  onChange,
  isSmallInput = false,
}: InputProps) {
  return (
    <InputWrapper>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <InputComponent
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        $error={error}
        value={value}
        onChange={onChange}
        $isSmallInput={isSmallInput}
      />
      <ErrorContainer>{error}</ErrorContainer>
    </InputWrapper>
  )
}

export default Input
