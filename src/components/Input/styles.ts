import styled from '@emotion/styled'

import { colors } from 'styles/colors'

export interface InputComponentStyleProps {
  $error?: string | undefined
  $isSmallInput: boolean
}

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const InputLabel = styled.label`
  font-size: 16px;
  color: ${colors.WHITE};
  padding-left: 5px;
`

export const InputComponent = styled.input<InputComponentStyleProps>`
  width: 100%;
  height: ${({ $isSmallInput }) => ($isSmallInput ? '100px' : '50px')};
  border: 1px solid black;
  border-radius: 7px;
  padding-left: 10px;
  background-color: ${colors.WHITE};
  color: ${colors.BLACK};

  &::placeholder {
    color: ${colors.BLACK};
    font-size: 16px;
  }

  &:hover {
    box-shadow: 0px 4px 12px ${colors.SHADOW};
  }
`
export const ErrorContainer = styled.p`
  font-size: 18px;
  color: ${colors.ERROR};
`
