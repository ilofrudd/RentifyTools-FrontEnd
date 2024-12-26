import styled from '@emotion/styled'
import { colors } from 'styles/colors'

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  min-height: 100vh;
`

export const PageTitle = styled.h1`
  color: ${colors.BUTTON};
  font-size: 32px;
  margin-bottom: 20px;
`

export const Pragraph = styled.p`
  color: white;
  margin-top: 8px;
  font-size: 16px;
`
export const BackButtonControl = styled.div`
  width: 80px;
  position: fixed;
  left: 350px;
  top: 100px;
`
