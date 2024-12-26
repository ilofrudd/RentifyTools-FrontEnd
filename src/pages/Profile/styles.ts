import styled from '@emotion/styled'
import { colors } from 'styles/colors'

export const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`

export const ProfileContainer = styled.div`
  width: 500px;
  padding: 20px;
  border: 2px solid ${colors.WHITE || '#ffffff'};
  border-radius: 15px;
  background-color: ${colors.HEADER || '#333'};
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`

export const ProfileTitle = styled.h1`
  font-size: 20px;
  font-family: 'Inter', sans-serif;
  color: ${colors.WHITE};
  margin: 0 0 10px 0;
  line-height: 1;
`

export const ProfileItem = styled.p`
  font-size: 16px;
  font-family: 'Inter', sans-serif;
  color: ${colors.WHITE};
  color: rgba(255, 255, 255, 1);
  margin: 0 0 10px 0;
  line-height: 0.8;
`
