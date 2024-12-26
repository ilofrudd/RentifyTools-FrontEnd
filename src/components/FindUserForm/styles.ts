import styled from '@emotion/styled'

import { colors } from 'styles/colors'

export const FindUserFormContainer = styled.form`
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
export const Title = styled.span`
  cursor: pointer;
  color: ${colors.WHITE};
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
export const ButtonControl = styled.div`
  width: 350px;
  height: 55px;
`
export const UserContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
export const UserInfo = styled.p`
  color: white;
`
