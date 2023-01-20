import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import houseReducer from './slices/houseSlice'

// eslint-disable-next-line import/prefer-default-export
export const store = configureStore({
  reducer: {
    user: userReducer,
    houses: houseReducer
  },
})