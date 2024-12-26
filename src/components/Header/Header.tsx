import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import HomeIcon from '@mui/icons-material/Home'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LoginIcon from '@mui/icons-material/Login'

import { loginSliceAction } from 'store/redux/loginSlice/loginSlice'

import Search from 'components/Search/Search'
import { TOOLS_APP_ROUTES } from 'constants/routes'
import { colors } from 'styles/colors'

import {
  AppHeader,
  AppTitle,
  HeaderLink,
  HeaderNav,
  LogoutContainer,
  SearchContainer,
} from './styles'
import { AppHeaderProps } from './types'

function Header({ isLogin, toolName, onChangeValue }: AppHeaderProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const goToHomePage = () => {
    navigate(TOOLS_APP_ROUTES.HOME)
  }

  const handleLogout = () => {
    dispatch(loginSliceAction.logoutUser())
    navigate(TOOLS_APP_ROUTES.HOME)
  }

  return (
    <AppHeader>
      <AppTitle onClick={goToHomePage}>RENTIFY TOOLS</AppTitle>
      <SearchContainer>
        <Search toolName={toolName} onChangeValue={onChangeValue} />
      </SearchContainer>
      <HeaderNav>
        <HeaderLink to={TOOLS_APP_ROUTES.HOME}>
          <HomeIcon
            sx={{
              transition: 'background-color 0.3s, color 0.3s',
              '&:hover': {
                color: colors.BUTTON,
              },
            }}
          />
        </HeaderLink>
        <HeaderLink to={TOOLS_APP_ROUTES.ADD_ADVERTS}>
          <AddCircleIcon
            sx={{
              transition: 'background-color 0.3s, color 0.3s',
              '&:hover': {
                color: colors.BUTTON,
              },
            }}
          />
        </HeaderLink>
        {isLogin ? (
          <>
            <HeaderLink to={TOOLS_APP_ROUTES.MY_PROFILE}>
              <AccountCircleIcon
                sx={{
                  transition: 'background-color 0.3s, color 0.3s',
                  '&:hover': {
                    color: colors.BUTTON,
                  },
                }}
              />
            </HeaderLink>
            <LogoutContainer onClick={handleLogout}>
              <LogoutIcon
                sx={{
                  transition: 'background-color 0.3s, color 0.3s',
                  '&:hover': {
                    color: colors.BUTTON,
                  },
                }}
              />
            </LogoutContainer>
          </>
        ) : (
          <HeaderLink to={TOOLS_APP_ROUTES.LOGIN}>
            <LoginIcon
              sx={{
                transition: 'background-color 0.3s, color 0.3s',
                '&:hover': {
                  color: colors.BUTTON,
                },
              }}
            />
          </HeaderLink>
        )}
      </HeaderNav>
    </AppHeader>
  )
}

export default Header
