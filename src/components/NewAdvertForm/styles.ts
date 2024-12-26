import styled from '@emotion/styled'
import { colors } from 'styles/colors'

export const NewAdvertFormContainer = styled.form`
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

export const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2px;
  width: 100%;
  gap: 15px;
`

export const DescriptionContainer = styled.textarea`
  width: 100%;
  height: 100px;
  border-radius: 7px;
  resize: none;
`

export const ImagePreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 10px;
  width: 100%;
`

export const ImagePreviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100px;
  gap: 5px;

  img {
    max-width: 100px;
    max-height: 100px;
    border-radius: 5px;
    object-fit: cover;
    border: 1px solid ${colors.WHITE};
  }

  a {
    font-size: 12px;
    color: ${colors.BUTTON};
    text-decoration: underline;
    text-align: center;
  }
`

export const ButtonControlWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 15px;
  align-items: center;
`
export const Title = styled.h1`
  font-size: 24px;
  color: ${colors.WHITE};
  margin-bottom: 20px;
  text-align: center;
`

export const InputLabel = styled.label`
  font-size: 16px;
  color: ${colors.WHITE};
  margin-bottom: 5px;
`
