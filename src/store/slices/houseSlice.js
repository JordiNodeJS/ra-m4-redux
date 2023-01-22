// @filename: userSlice.js

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { urls } from '../../constants'
import { removeDuplicates } from '../utils'

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
    categorySelected: '',
    citySelected: '',
    housesList: {
      byId: {},
      allIds: [],
      byCities: [], //  byCities: [{value: 'madrid', text: 'Madrid' }, {...}, {..}]
      byCategories: [], // byCategories:  [{value: 'garaje', text: 'Garaje' }, {...}, {..}]
    },
  },
  reducers: {
    selectCategory: (state, action) => {
      state.categorySelected = action.payload
    }
  },
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

        action.payload.forEach(houseApi => {
          const { id, city, type } = houseApi
          state.housesList.byId[id] = houseApi

          if (!state.housesList.allIds.includes(id)) {
            state.housesList.allIds.push(id)
          }
          // CITIES 🏙
          const isCity = state.housesList.byCities.find(c => c.value === city)
          if (!isCity) {
            state.housesList.byCities.push({
              value: city,
              text: city.charAt(0).toUpperCase() + city.slice(1),
            })
          }

          // CATEGORIES 🏡🏰
          state.housesList.byCategories.push({
            value: type,
            text: type.charAt(0).toUpperCase() + type.slice(1),
          })
        })

        // UNIQUE CITIES 👇
        // state.housesList.byCities = removeDuplicates(state.housesList.byCities)

        // UNIQUE CATEGORIES 👇
        state.housesList.byCategories = removeDuplicates(
          state.housesList.byCategories,
        )
      })
  },
})

const { actions, reducer } = houseSlice

// Action creators are generated for each case reducer function
export const { selectCategory } = actions

export default reducer
