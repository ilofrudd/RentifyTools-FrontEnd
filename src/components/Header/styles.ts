import styled from '@emotion/styled'
import { NavLink } from 'react-router-dom'

import { colors } from 'styles/colors'

export const AppHeader = styled.header`
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  z-index: 10;
  width: 100%;
  height: 80px;
  border-bottom: 2px solid ${colors.WHITE};
  backdrop-filter: blur(4px);
  background: ${colors.HEADER};
`

export const AppTitle = styled.span`
  font-size: 24px;
  font-weight: 700;
  line-height: 29.05px;
  margin-left: 30px;
  color: ${colors.WHITE};
  cursor: pointer;
`

export const HeaderNav = styled.nav`
  display: flex;
  gap: 30px;
  height: 100%;
  align-items: center;
`

export const HeaderLink = styled(NavLink)`
  font-size: 20px;
  font-weight: 400px;
  text-decoration: none;
  line-height: 24.2px;
  color: ${colors.WHITE};
  margin-right: 50px;
  border-radius: 20px;

  &.active {
    font-weight: 'bold';
    color: ${colors.BUTTON};
  }
  @media (max-width: 768px) {
    font-size: 16px;
    margin-right: 20px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    margin-right: 10px;
  }
`

export const LogoutContainer = styled.div`
  font-size: 20px;
  font-weight: 400px;
  text-decoration: none;
  line-height: 24.2px;
  color: ${colors.WHITE};
  margin-right: 50px;
  border-radius: 20px;

  &.active {
    font-weight: 'bold';
    color: ${colors.BUTTON};
  }
  @media (max-width: 768px) {
    font-size: 16px;
    margin-right: 20px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    margin-right: 10px;
  }
`
export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 700px;
  height: fit-content;
`
