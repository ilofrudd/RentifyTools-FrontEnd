import styled from '@emotion/styled'
import { colors } from 'styles/colors'

export const ChangeUserFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
  background-color: ${colors.CARD};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`

export const Title = styled.h2`
  font-size: 24px;
  color: ${colors.WHITE};
  margin-bottom: 20px;
`

export const InputsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`

export const ButtonControlWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  width: 100%;
`
export const Label = styled.h2`
  font-size: 16px;
  color: ${colors.WHITE};
  margin-bottom: 5px;
`
