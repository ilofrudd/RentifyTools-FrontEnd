import styled from '@emotion/styled'
import { NavLink } from 'react-router-dom'

import { colors } from 'styles/colors'

export const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`

export const Sidebar = styled.header`
  width: 300px;
  padding-top: 40px;
  background: ${colors.HEADER};
  border-right: 2px solid ${colors.WHITE};
  position: fixed;
  left: 0;
  top: 80px;
  height: 100vh;
`

export const Content = styled.main`
  flex: 1;
  margin-left: 300px;
  box-sizing: border-box;
`

export const SidebarLink = styled(NavLink)`
  font-size: 20px;
  text-decoration: none;
  font-weight: 400;
  line-height: 24.2px;
  color: ${colors.WHITE};
  border-radius: 8px;
  padding: 10px 20px;
  transition:
    background-color 0.3s,
    color 0.3s;

  &:hover {
    color: ${colors.BUTTON};
  }

  &.active {
    font-weight: bold;
    color: ${colors.BUTTON};
  }
`

export const UserProfile = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`

export const UserPhoto = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 3px solid ${colors.BUTTON};
`

export const UserName = styled.h3`
  font-size: 24px;
  color: ${colors.WHITE};
`
export const AdminLabel = styled.h3`
  font-size: 24px;
  color: ${colors.BUTTON};
`

export const SidebarNav = styled.nav`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 25px;
`
