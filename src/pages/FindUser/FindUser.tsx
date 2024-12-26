import { useState } from 'react'
import { useSnackbar } from 'notistack'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import {
  adminSliceSelectors,
  adminSliceAction,
} from 'store/redux/adminSlice/adminSlice'
import { loginSliceSelectors } from 'store/redux/loginSlice/loginSlice'
import Button from 'components/Button/Button'
import FindUsersForm from 'components/FindUserForm/FindUserForm'
import UserCard from 'components/UserCard/UserCard'
import {
  PageWrapper,
  ButtonControl,
  CardsContainer,
  CardWrapper,
} from './styles'

function FindUsers() {
  const dispatch = useAppDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const { user } = useAppSelector(loginSliceSelectors.currentUser)
  const { foundUsers } = useAppSelector(adminSliceSelectors.search_users)
  const [isFound, setIsFound] = useState(false)

  const onDeleteUser = (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?'))
      dispatch(adminSliceAction.deleteUser(userId))
        .unwrap()
        .then(() => {
          enqueueSnackbar('User deleted successfully', {
            variant: 'success',
          })
          // return dispatch(adminSliceAction.getAllUsers())
        })
        .catch(error => {
          enqueueSnackbar(error, { variant: 'error' })
        })
  }

  const onUpdateRole = (userId: string, role: string) => {
    dispatch(adminSliceAction.setUserRole({ userId, role }))
      .unwrap()
      .then(() => {
        enqueueSnackbar('Users role updated successfully', {
          variant: 'success',
        })
      })
      .catch(error => {
        enqueueSnackbar(error, { variant: 'error' })
      })
  }

  const handleIsFound = () => {
    if (foundUsers.length) {
      setIsFound(true)
    } else {
      enqueueSnackbar('No users found!', { variant: 'warning' })
    }
  }

  const handleNewSearch = () => {
    setIsFound(false)
  }

  const userCards = foundUsers.map(user => (
    <CardWrapper>
      <UserCard
        key={user.id}
        userData={user}
        onDelete={() => onDeleteUser(user.id)}
        onUpdate={() => onUpdateRole(user.id, 'ADMIN')}
      />
    </CardWrapper>
  ))

  return (
    <PageWrapper>
      {!isFound ? (
        <FindUsersForm onSearch={handleIsFound} />
      ) : (
        <>
          <ButtonControl>
            <Button onClick={handleNewSearch} name="New search" />
          </ButtonControl>
          <CardsContainer>{userCards}</CardsContainer>
        </>
      )}
    </PageWrapper>
  )
}

export default FindUsers
