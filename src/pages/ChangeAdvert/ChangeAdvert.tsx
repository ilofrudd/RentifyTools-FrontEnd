import { useNavigate } from 'react-router-dom'
import ChangeAdvertForm from 'components/ChangeAdvertForm/ChangeAdvertForm'
import {
  PageWrapper,
  PageTitle,
  BackButtonControl,
  SuccessMessage,
} from './styles'

import Button from 'components/Button/Button'

function ChangeAdvert() {
  const navigate = useNavigate()
  return (
    <PageWrapper>
      <BackButtonControl>
        <Button name="Back" onClick={() => navigate(-1)} />
      </BackButtonControl>
      <PageTitle>Edit Your Advert</PageTitle>
      <ChangeAdvertForm />
    </PageWrapper>
  )
}

export default ChangeAdvert
