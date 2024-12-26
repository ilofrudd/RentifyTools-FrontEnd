import { useState, useEffect, ChangeEvent } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { v4 } from 'uuid'

import Header from 'components/Header/Header'
import { TOOLS_APP_ROUTES } from 'constants/routes'

import {
  LayoutWrapper,
  AppMain,
  AppFooter,
  FooterNav,
  FooterLink,
} from './styles'

function Layout() {
  const location = useLocation()
  const [toolName, setToolName] = useState<string>('')

  const isLogin = Boolean(localStorage.getItem('accessToken'))

  useEffect(() => {
    setToolName('')
  }, [location.pathname])

  const onChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    setToolName(event.target.value)
  }

  const appLinksFooter = {
    [TOOLS_APP_ROUTES.HELP]: 'Help',
    [TOOLS_APP_ROUTES.ADVERTISING]: 'Advertising',
    [TOOLS_APP_ROUTES.ABOUT_US]: 'About us',
    [TOOLS_APP_ROUTES.CONTACTS]: 'Contacts',
    [TOOLS_APP_ROUTES.PRIVACY_POLICY]: 'Privacy Policy',
    [TOOLS_APP_ROUTES.CONDITIONS]: 'Conditions of use',
    [TOOLS_APP_ROUTES.IMPRINT]: 'Imprint',
    [TOOLS_APP_ROUTES.SOCIAL_MEDIA]: 'Social media',
  }

  const footerLinks = Object.keys(appLinksFooter).map((link: string) => (
    <FooterLink key={v4()} to={link}>
      {appLinksFooter[link as keyof typeof appLinksFooter]}
    </FooterLink>
  ))

  return (
    <LayoutWrapper>
      <Header
        isLogin={isLogin}
        toolName={toolName}
        onChangeValue={onChangeValue}
        onSearch={function (): void {
          throw new Error('Function not implemented.')
        }}
      />
      <AppMain>
        <Outlet />
      </AppMain>
      <AppFooter>
        <FooterNav>{footerLinks}</FooterNav>
      </AppFooter>
    </LayoutWrapper>
  )
}

export default Layout
function dispatch(arg0: any) {
  throw new Error('Function not implemented.')
}
