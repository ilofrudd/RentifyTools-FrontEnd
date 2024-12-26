import styled from '@emotion/styled'

import { colors } from 'styles/colors'

interface TitleStyleProps {
  $isActive: boolean
}

export const SignUpFormContainer = styled.form`
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
  gap: 10px;
`
export const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
`
export const Title = styled.span<TitleStyleProps>`
  cursor: pointer;
  color: ${({ $isActive }) => ($isActive ? '#F69320' : '#FFFFFF')};
  font-size: 30px;
  font-weight: ${({ $isActive }) => ($isActive ? 'bold' : 'normal')};
`
export const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2px;
  width: 350px;

  &.inline {
    flex-direction: row;
    gap: 5px;
    justify-content: space-between;
  }
`
export const Text = styled.span`
  color: ${colors.WHITE};
  font-size: 12px;
  font-weight: bold;
  justify-content: space-evenly;
  text-align: center;
`
export const ButtonControl = styled.div`
  width: 350px;
  height: 55px;
`
export const ErrorContainer = styled.div`
  color: ${colors.ERROR};
`
