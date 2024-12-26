import styled from '@emotion/styled'

import { colors } from 'styles/colors'

interface ButtonComponentStyleProps {
  $isTransparent: boolean
}

export const ButtonComponent = styled.button<ButtonComponentStyleProps>`
  width: 100%;
  height: 55px;
  background-color: ${({ $isTransparent, disabled }) => {
    if (disabled) {
      return colors.GREY
    } else {
      if ($isTransparent) {
        return colors.TRANSPARENT
      } else {
        return colors.BUTTON
      }
    }
  }};
  color: ${colors.WHITE};
  font-size: 20px;
  font-weight: bold;
  border-radius: 7px;
  border: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: transform 0.2s ease;

  &:active {
    transform: scale(0.95);
  }
`
