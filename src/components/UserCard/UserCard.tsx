import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton } from '@mui/material'

import { UserName } from 'components/LayoutProfile/styles'
import { colors } from 'styles/colors'

import { UserContainer, UserDetails, UserActions, UserInfo } from './styles'
import { UserProps } from './types'

function UserCard({ userData, onDelete, onUpdate }: UserProps) {
  const usersRoles =
    userData?.roles?.map(role => role.title).join(', ') || 'No roles'

  return (
    <UserContainer>
      <UserDetails>
        {userData && (
          <>
            <UserName>{`${userData.firstname} ${userData.lastname}`}</UserName>
            <UserInfo>Email: {userData.email}</UserInfo>
            <UserInfo>Phone: {userData.phone}</UserInfo>
            <UserInfo>Role: {usersRoles}</UserInfo>
            <UserInfo>City: {userData.address.city}</UserInfo>
            <UserInfo>Post Code: {userData.address.zipCode}</UserInfo>
          </>
        )}
      </UserDetails>
      <UserActions>
        <IconButton onClick={onUpdate} sx={{ color: colors.BUTTON }}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={onDelete} sx={{ color: colors.BUTTON }}>
          <DeleteIcon />
        </IconButton>
      </UserActions>
    </UserContainer>
  )
}

export default UserCard
