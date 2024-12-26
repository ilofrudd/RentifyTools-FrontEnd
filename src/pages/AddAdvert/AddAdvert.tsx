import { useNavigate } from 'react-router-dom'

import Modal from 'components/Modal/Modal'
import Button from 'components/Button/Button'
import NewAdvertForm from 'components/NewAdvertForm/NewAdvertForm'

import { TOOLS_APP_ROUTES } from 'constants/routes'

import {
  PageWrapper,
  ModalInfoContainer,
  ModalInfo,
  ButtonControl,
} from './styles'

function AddAdvert() {
  const navigate = useNavigate()
  const isLogin = Boolean(localStorage.getItem('accessToken'))

  const closeModal = () => {
    navigate(TOOLS_APP_ROUTES.LOGIN)
  }

  return (
    <PageWrapper>
      {isLogin ? (
        <NewAdvertForm />
      ) : (
        <Modal isModalOpened={true}>
          <ModalInfoContainer>
            <ModalInfo>{'Please sign in to add an advert !'}</ModalInfo>
            <ButtonControl>
              <Button name="Close" onClick={closeModal} />
            </ButtonControl>
          </ModalInfoContainer>
        </Modal>
      )}
    </PageWrapper>
  )
}
export default AddAdvert
