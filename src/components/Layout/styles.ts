import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import { colors } from 'styles/colors'
import { AppImg } from 'assets'

export const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-image: url(${AppImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: auto;
  background-attachment: fixed;
`

export const AppMain = styled.main`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 80px;
  flex: 1;
  padding: 40px;
  padding-top: 70px;
  height: calc(100vh - 80px);
`

export const AppFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100px;
  border-top: 2px solid ${colors.WHITE};
  padding-left: 20px;
  color: white;
  backdrop-filter: blur(4px);
  background: ${colors.FOOTER};

  &:hover {
    box-shadow: 0px 4px 12px ${colors.SHADOW};
  }
`

export const FooterNav = styled.nav`
  display: flex;
  flex-direction: row;
  gap: 50px;
  justify-content: space-evenly;
  text-align: center;
`

export const FooterLink = styled(Link)`
  color: white;
  font-size: 14px;
  text-decoration: bold;
`
