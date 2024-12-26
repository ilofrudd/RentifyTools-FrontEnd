import styled from '@emotion/styled'

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 4px;
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
export const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  font-weight: bold;
  color: white;
  font-size: 26px;
`
