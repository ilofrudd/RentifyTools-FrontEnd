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

export const PageTitle = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: ${colors.WHITE};
  margin-top: 10px;
`

export const CategoryContainer = styled.div`
  min-height: 400px;
  display: flex;
  flex-direction: column;
  width: fit-content;
  justify-content: center;
  align-items: center;
  background-color: ${colors.HEADER};
  gap: 10px;
  border-radius: 7px;
  border: 1px solid ${colors.WHITE};
`
export const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`
export const PageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 20px;
  justify-content: center;
  align-items: center;
  width: fit-content;
  padding: 20px;
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

export const ImageWrapper = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
  height: 150px;
  width: 140px;
  cursor: pointer;
`

export const CategoryImg = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
export const ImageTitle = styled.span`
  font-size: 14px;
  font-weight: normal;
  color: ${colors.WHITE};
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
export const BackButtonControl = styled.div`
  width: 80px;
  position: fixed;
  left: 100px;
  top: 100px;
`
