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
  position: relative;
`

export const SwitchContainer = styled.div`
  position: absolute;
  left: 300px;
  top: 50px;
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
`

export const SwitchContainerText = styled.span`
  font-size: 20px;
  color: ${colors.WHITE};
`

export const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  justify-content: center;
  align-items: center;
  width: fit-content;
  padding: 20px;
  margin-top: 20px;
`
export const TextContainer = styled.h2`
  font-weight: bold;
  color: ${colors.WHITE};
  margin: 10px;
  background: ${colors.HEADER};
  height: fit-content;
  width: fit-content;
  padding: 5px;
  border-radius: 7px;
`
