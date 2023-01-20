// @filename: userSlice.js

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { urls } from '../../constants'


export const getHouses = createAsyncThunk('houses/getHouses', async () => {
  const res = await fetch(urls.houses)
  const data = await res.json()
  return data
})

export const houseSlice = createSlice({
  name: 'houses',
  initialState: {
    reqStatus: 'loading',
    houses: [],
  },
  reducers: {},
  extraReducers: builder => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(getHouses.pending, state => {
        state.reqStatus = 'loading'
      })
      .addCase(getHouses.rejected, state => {
        // Add user to the state array
        state.reqStatus = 'failed'
      })
      .addCase(getHouses.fulfilled, (state, action) => {
        state.reqStatus = 'success'
        state.houses.push(...action.payload)
      })
  },
})

const { actions, reducer } = houseSlice

export const selectHouse = state => state.house

// Action creators are generated for each case reducer function
export const { updateName } = actions

export default reducer
