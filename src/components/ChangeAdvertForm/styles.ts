import styled from '@emotion/styled'

import { colors } from 'styles/colors'

export const ChangeAdvertFormContainer = styled.form`
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

export const ButtonControlWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 15px;
  align-items: center;
`
export const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
`
export const Title = styled.span`
  cursor: pointer;
  color: ${colors.BUTTON};
  font-size: 30px;
  font-weight: bold;
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
export const DescriptionContainer = styled.textarea`
  display: flex;
  flex-direction: row;
  margin-top: 2px;
  width: 350px;
  height: 100px;
  border-radius: 7px;
`
