import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: 'Stanley',
  surnames: {
    first: 'Kubrick',
    second: 'Dev',
  },
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
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

// Action creators are generated for each case reducer function
export const {
  updateName,
  updateSurname,
  updateFirstSurname,
  updateSecondSurname,
} = userSlice.actions

export default userSlice.reducer
