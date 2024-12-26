import styled from '@emotion/styled'
import { colors } from 'styles/colors'

export const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 450px;
  border: 1px solid ${colors.WHITE};
  padding: 40px;
  border-radius: 7px;
  backdrop-filter: blur(4px);
  background: ${colors.HEADER};
`
export const Text = styled.span`
  color: ${colors.WHITE};
  font-size: 12px;
  font-weight: bold;
  justify-content: space-evenly;
  text-align: center;
`
