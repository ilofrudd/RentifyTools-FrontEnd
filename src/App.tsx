import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'

import Layout from 'components/Layout/Layout'
import LayoutProfile from 'components/LayoutProfile/LayoutProfile'
import Home from 'pages/Home/Home'
import MyAdvert from 'pages/MyAdvert/MyAdvert'
import SignUpForm from 'pages/Login/Login'
import { TOOLS_APP_ROUTES } from 'constants/routes'
import AddAdvert from 'pages/AddAdvert/AddAdvert'
import ChangeAdvert from 'pages/ChangeAdvert/ChangeAdvert'
import HomePlug from 'pages/HomePlug/HomePlug'
import SearchResults from 'pages/SearchResult/SearchResult'
import Profile from 'pages/Profile/Profile'
import Advert from 'pages/Advert/Advert'
import FindUsers from 'pages/FindUser/FindUser'
import Favorites from 'pages/Favorites/Favorites'
import ChangeUser from 'pages/ChangeUser/ChangeUser'

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <BrowserRouter>
        <Routes>
          <Route path={TOOLS_APP_ROUTES.HOME} element={<Layout />}>
            <Route path={TOOLS_APP_ROUTES.HOME} element={<Home />} />
            <Route
              path={TOOLS_APP_ROUTES.ADD_ADVERTS}
              element={<AddAdvert />}
            />
            <Route path={TOOLS_APP_ROUTES.LOGIN} element={<SignUpForm />} />

            <Route
              path={TOOLS_APP_ROUTES.SEARCH_RESULTS}
              element={<SearchResults />}
            />
            <Route path={TOOLS_APP_ROUTES.TOOLS} element={<Advert />} />
            <Route path={TOOLS_APP_ROUTES.PROFILE} element={<LayoutProfile />}>
              <Route path={TOOLS_APP_ROUTES.MY_PROFILE} element={<Profile />} />
              <Route path={TOOLS_APP_ROUTES.MESSAGES} element={<HomePlug />} />
              <Route
                path={TOOLS_APP_ROUTES.CHANGE_USER}
                element={<ChangeUser />}
              />
              <Route
                path={TOOLS_APP_ROUTES.MY_ADVERTS}
                element={<MyAdvert />}
              />
              <Route
                path={'/profile/my-adverts/change-advert/:id'}
                element={<ChangeAdvert />}
              />
              <Route
                path={TOOLS_APP_ROUTES.FAVOURITES}
                element={<Favorites />}
              />
              <Route
                path={TOOLS_APP_ROUTES.CHANGE_USER}
                element={<ChangeUser />}
              />
              <Route
                path={TOOLS_APP_ROUTES.RENTED_TOOLS}
                element={<HomePlug />}
              />
              <Route
                path={TOOLS_APP_ROUTES.FIND_USERS}
                element={<FindUsers />}
              />
              <Route path={TOOLS_APP_ROUTES.CATEGORY} element={<HomePlug />} />
            </Route>
            <Route path="/tools/:id" element={<Advert />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
  )
}

export default App
