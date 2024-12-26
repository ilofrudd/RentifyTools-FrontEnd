import styled from '@emotion/styled'

import { colors } from 'styles/colors'

interface TitleStyleProps {
  isActive: boolean
}
export const SignInFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 450px;
  border: 1px solid ${colors.WHITE};
  padding: 40px;
  border-radius: 7px;
  backdrop-filter: blur(4px);
  background: ${colors.HEADER};
  gap: 20px;
`
export const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
`
export const Title = styled.span<TitleStyleProps>`
  cursor: pointer;
  color: ${({ isActive }) => (isActive ? '#F69320' : '#FFFFFF')};
  font-size: 30px;
  font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')};
`
export const InputLabel = styled.label`
  font-size: 16px;
  color: ${colors.WHITE};
`
export const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2px;
  width: 350px;
`
export const Text = styled.span`
  color: ${colors.WHITE};
  font-size: 12px;
  font-weight: bold;
  justify-content: space-evenly;
  text-align: center;
`
export const ErrorContainer = styled.div`
  color: ${colors.ERROR};
`
