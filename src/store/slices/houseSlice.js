// @filename: userSlice.js

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { urls } from '../../constants'

function removeDuplicates(arr) {
  return arr.filter(
    (el, index) => arr.findIndex(e => e.value === el.value) === index,
  )
}

// thunks
export const getHouses = createAsyncThunk('houses/getHouses', async () => {
  const res = await fetch(urls.houses)
  const data = await res.json()
  return data
})

export const houseSlice = createSlice({
  name: 'houses',
  initialState: {
    reqStatus: 'initial',
    housesList: {
      byId: {},
      allIds: [],
      byCities: [],
      byCategories: [],
    },
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getHouses.pending, state => {
        state.reqStatus = 'loading'
      })
      .addCase(getHouses.rejected, state => {
        state.reqStatus = 'failed'
      })
      .addCase(getHouses.fulfilled, (state, action) => {
        state.reqStatus = 'success'

        action.payload.forEach(house => {
          const { id, city, type } = house
          state.housesList.byId[id] = house

          if (!state.housesList.allIds.includes(id)) {
            state.housesList.allIds.push(id)
          }
          // CITIES 🏙
          state.housesList.byCities.push({
            value: city,
            text: city.charAt(0).toUpperCase() + city.slice(1),
          })
          // CATEGORIES 🏡🏰
          state.housesList.byCategories.push({
            value: type,
            text: type.charAt(0).toUpperCase() + type.slice(1),
          })
        })

        // UNIQUE CITIES 👇
        state.housesList.byCities = removeDuplicates(state.housesList.byCities)

        // UNIQUE CATEGORIES 👇
        state.housesList.byCategories = removeDuplicates(
          state.housesList.byCategories,
        )
      })
  },
})

const { actions, reducer } = houseSlice

// Action creators are generated for each case reducer function
export const { updateName } = actions

export default reducer
