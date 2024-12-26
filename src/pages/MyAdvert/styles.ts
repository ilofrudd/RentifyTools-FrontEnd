import styled from '@emotion/styled'

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 4px;
`
export const CardsContainer = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  justify-content: center;
  align-items: center;
  width: fit-content;
`
