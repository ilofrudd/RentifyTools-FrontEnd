import styled from '@emotion/styled'

import { colors } from 'styles/colors'

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  gap: 4px;
`
export const ModalInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  gap: 30px;
`
export const ModalInfo = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: ${colors.WHITE};
`
export const ButtonControl = styled.div`
  width: 150px;
  height: 35px;
`
