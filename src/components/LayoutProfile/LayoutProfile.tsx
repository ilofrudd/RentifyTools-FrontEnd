import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { v4 } from 'uuid'

import { useAppDispatch, useAppSelector } from 'store/hooks'
import {
  loginSliceSelectors,
  loginSliceAction,
} from 'store/redux/loginSlice/loginSlice'
import { TOOLS_APP_ROUTES } from 'constants/routes'
import { UserImg } from 'assets'

import {
  ProfileWrapper,
  Sidebar,
  SidebarNav,
  SidebarLink,
  Content,
  UserProfile,
  UserPhoto,
  UserName,
  AdminLabel,
} from './styles'

function LayoutProfile() {
  const navigate = useNavigate()

  const { user } = useAppSelector(loginSliceSelectors.currentUser)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!user) {
      dispatch(loginSliceAction.getCurrentUser())
    }
  }, [user, dispatch])

  const isAdmin = user?.roles?.some(role => role.title === 'ADMIN') || false

  const goToProfile = () => {
    navigate(TOOLS_APP_ROUTES.MY_PROFILE)
  }

  const profileLinks = {
    [TOOLS_APP_ROUTES.MY_ADVERTS]: 'My Adverts',
    [TOOLS_APP_ROUTES.FAVOURITES]: 'Favorites ',
    [TOOLS_APP_ROUTES.RENTED_TOOLS]: 'Rented Tools',
  }
  const adminLinks = {
    [TOOLS_APP_ROUTES.FIND_USERS]: 'Find Users',
    [TOOLS_APP_ROUTES.CATEGORY]: 'Category',
  }

  const sidebarLinks = [
    ...Object.keys(profileLinks).map(link => (
      <SidebarLink key={v4()} to={link}>
        {profileLinks[link as keyof typeof profileLinks]}
      </SidebarLink>
    )),
    isAdmin && (
      <>
        <hr />
        <AdminLabel>Admin Panel</AdminLabel>
        {Object.keys(adminLinks).map(link => (
          <SidebarLink key={v4()} to={link}>
            {adminLinks[link as keyof typeof adminLinks]}
          </SidebarLink>
        ))}
      </>
    ),
  ].filter(Boolean)

  const userName = user ? `${user.firstname} ${user.lastname}` : 'User Name'

  return (
    <ProfileWrapper>
      <Sidebar>
        <UserProfile onClick={goToProfile}>
          <UserPhoto src={UserImg} alt="User Photo" />
          <UserName>{userName}</UserName>
        </UserProfile>
        <SidebarNav>{sidebarLinks}</SidebarNav>
      </Sidebar>
      <Content>
        <Outlet />
      </Content>
    </ProfileWrapper>
  )
}

export default LayoutProfile
