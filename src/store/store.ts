import type { Action, ThunkAction } from '@reduxjs/toolkit'
import { combineSlices, configureStore } from '@reduxjs/toolkit'
import { userSlice } from 'store/redux/userSlice/userSlice'
import { loginSlice } from 'store/redux/loginSlice/loginSlice'
import { categorySlice } from './redux/categorySlice/categorySlice'
import { toolSlice } from './redux/toolSlice/toolSlice'
import { adminSlice } from 'store/redux/adminSlice/adminSlice'
import { messageSlice } from './redux/messageSlice/messageSlice'
import { addressSlice } from './redux/addressSlice/addressSlice'

const rootReducer = combineSlices(
  userSlice,
  loginSlice,
  toolSlice,
  adminSlice,
  categorySlice,
  messageSlice,
  addressSlice,
)

export type RootState = ReturnType<typeof rootReducer>

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  })
  return store
}

export const store = makeStore()
export type AppStore = typeof store
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
