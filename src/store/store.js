import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './userSlice'
// eslint-disable-next-line import/prefer-default-export
export const store = configureStore({
  reducer: {
    user: userSlice
  },
})