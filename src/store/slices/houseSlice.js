// @filename: userSlice.js

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { urls } from '../../constants'
import { removeDuplicates } from './utils'

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
    page: 1,
    categorySelected: '',
    citySelected: '',
    housesList: {
      byCities: [{value: 'allIds', text: 'All'}], //  byCities: [{value: 'madrid', text: 'Madrid' }, {...}, {..}]
      byCategories: [{value: 'allIds', text: 'All'}], // byCategories:  [{value: 'garaje', text: 'Garaje' }, {...}, {..}]
      allIds: [],
      byId: {}
      /* 
      madrid: [],
      barcelona: [],
      zaragoza: [],
      garaje: [],
      chalets: [],
      piso: []
      */
    },
  },
  reducers: {
    selectCategory: (state, action) => {
      state.categorySelected = action.payload // <-- category
      if (action.payload !== 'allIds') {
        state.housesList[action.payload] = Object.entries(state.housesList.byId)
          .filter(([, house]) => house.type === action.payload)
          .map(([id]) => +id)
      }

    },
    selectCity: (state, action) => {
      state.citySelected = action.payload

      state.housesList[action.payload] = Object.keys(state.housesList.byId)
      .filter(key => state.housesList.byId[key].city === action.payload)
      .map(id => +id)
    },
    loadMore: (state, action) => {
      state.page = action.payload + 1
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

        action.payload.forEach(house => {
          const { id, city, type } = house
          state.housesList.byId[id] = house

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
            state.housesList[city] = [] // create states base on cities ex. barcelona: [3, 5, 6]
          }

          // CATEGORIES 🏡🏰
          const isCategory = state.housesList.byCategories.find(c => c.value === type)
          if (!isCategory) {
            state.housesList.byCategories.push({
              value: type,
              text: type.charAt(0).toUpperCase() + type.slice(1),
          })
          }
          state.housesList.byId[id] = house

        })

        // UNIQUE CITIES 👇
        // state.housesList.byCities = removeDuplicates(state.housesList.byCities)

        // UNIQUE CATEGORIES 👇
        // state.housesList.byCategories = removeDuplicates(
        //   state.housesList.byCategories,
        // )
        // create states base on categories
        // state.housesList.byCategories.forEach(category => {
        //  if (category.value !== 'allIds' ) state.housesList[category.value] = [] 
        // })
        
      })
  },
})

const { actions, reducer } = houseSlice

// Action creators are generated for each case reducer function
export const { selectCategory, selectCity, loadMore } = actions

export default reducer
