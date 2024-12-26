import { useAppDispatch, useAppSelector } from 'store/hooks'
import { PageWrapper, ProfileContainer } from './styles'
import UserCard from 'components/UserCard/UserCard'
import { loginSliceSelectors } from 'store/redux/loginSlice/loginSlice'
import { useNavigate } from 'react-router-dom'
import { userSliceAction } from 'store/redux/userSlice/userSlice'
import { TOOLS_APP_ROUTES } from 'constants/routes'

function Profile() {
  const { user, error } = useAppSelector(loginSliceSelectors.currentUser)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete the user?')) {
      try {
        const result = await dispatch(userSliceAction.deleteUser())
        if (userSliceAction.deleteUser.fulfilled.match(result)) {
        } else {
          console.error('Error deleting:', result.payload || result.error)
        }
      } catch (error) {
        console.error('An unexpected error occurred:', error)
      }
    }
  }

  const handleUpdate = () => {
    navigate(TOOLS_APP_ROUTES.CHANGE_USER)
  }

  return (
    <PageWrapper>
      {user ? (
        <ProfileContainer>
          <UserCard
            userData={user}
            error={error}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        </ProfileContainer>
      ) : (
        <p>User data is not available.</p>
      )}
    </PageWrapper>
  )
}

export default Profile
