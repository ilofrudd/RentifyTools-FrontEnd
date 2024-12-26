import { useAppDispatch, useAppSelector } from 'store/hooks'
import { useNavigate } from 'react-router-dom'
import { PageWrapper, PageTitle, Pragraph, BackButtonControl } from './styles'
import ChangeUserForm from 'components/ChangeUserForm/ChangeUserForm'
import { loginSliceSelectors } from 'store/redux/loginSlice/loginSlice'

import { useState } from 'react'
import Button from 'components/Button/Button'

function ChangeUser() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { user, error: loadError } = useAppSelector(
    loginSliceSelectors.currentUser,
  )
  const { isLoading, error: updateError } = useAppSelector(
    state => state.REGISTER_USER,
  )
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  if (!user) {
    return (
      <PageWrapper>
        <PageTitle>Edit Your Profile</PageTitle>
        <Pragraph>User information could not be loaded.</Pragraph>
        {loadError && <Pragraph style={{ color: 'red' }}>{loadError}</Pragraph>}
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <BackButtonControl>
        <Button name="Back" onClick={() => navigate(-1)} />
      </BackButtonControl>
      {isLoading && <Pragraph>Lädt...</Pragraph>}
      {updateError && (
        <Pragraph style={{ color: 'red' }}>Fehler: {updateError}</Pragraph>
      )}
      {successMessage && (
        <Pragraph style={{ color: 'green' }}>{successMessage}</Pragraph>
      )}

      <ChangeUserForm userData={user} error={updateError} />
    </PageWrapper>
  )
}

export default ChangeUser
