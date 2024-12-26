import styled from '@emotion/styled'
import { colors } from 'styles/colors'

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  flex: 1;
  gap: 20px;
`
export const ButtonControl = styled.div`
  width: 250px;
  height: 55px;
`
export const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 500px;
  padding: 20px;
  border: 2px solid ${colors.WHITE};
  border-radius: 15px;
  background-color: ${colors.HEADER};
  box-shadow: 0 4px 8px ${colors.SHADOW};
`
export const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  justify-content: center;
  align-items: center;
  width: fit-content;
  padding: 20px;
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
