// @filename: userSlice.js
import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: 'Stanley',
    surnames: {
      first: 'Kubrick',
      second: 'Dev',
    },
  },
  reducers: {
    updateName: (state, action) => {
      state.name = action.payload
    },
    updateFirstSurname: (state, action) => {
      state.surnames.first = action.payload
    },
    updateSecondSurname: (state, action) => {
      state.surnames.second = action.payload
    },
  },
})

const {actions, reducer } = userSlice

// Action creators are generated for each case reducer function
export const { updateName, updateFirstSurname, updateSecondSurname } = actions

export default reducer
