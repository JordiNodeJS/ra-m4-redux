/* eslint-disable default-param-last */
// @filename: userSlice.js

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { urls } from '../../constants'
import { filterHouses } from '../../utils/filters'

// thunks ex. http://localhost:3001/pisos?_page=2&_limit=3
export const getHouses = createAsyncThunk('houses/getHouses', async (number = 1, { rejectWithValue }) => {
  const res = await fetch( `${urls.houses}?_page=${number}&_limit=9`)
  const data = await res.json()
  if (res.status < 200 || res.status >= 300) {
    return rejectWithValue(data)
  }
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
      byCities: [], //  byCities: [{value: 'madrid', text: 'Madrid' }, {...}, {..}]
      byCategories: [], // byCategories:  [{value: 'garaje', text: 'Garaje' }, {...}, {..}]
      allIds: [],
      byId: {} /*  {
                    1: {
                      id: 1,
                      title: 'Piso 1',
                    },
                    2: {
                      id: 2,
                      title: 'Piso 2',
                    },
                  } */
    },
  },
  reducers: {
    setCategory: (state, action) => {
      state.categorySelected = action.payload // <-- category
      const selection = 'type'
      state.housesList.filterIds = filterHouses(state.housesList.byId, selection, action.payload)
    },
    setCity: (state, action) => {
      state.citySelected = action.payload // <-- city
      const selection = 'city'
      state.housesList.filterIds = filterHouses(state.housesList.byId, selection, action.payload)
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getHouses.pending, state => {
        state.reqStatus = 'loading'
      })
      .addCase(getHouses.rejected, state => {
        state.reqStatus = 'failed'
      })
      .addCase(getHouses.fulfilled, (state, action) => { // <-- houses from the API arrive here
        state.reqStatus = 'success'

        action.payload.forEach(house => { // <-- for each individual house we do the next things
          const { id, city, type: category } = house
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
          const isCategory = state.housesList.byCategories.find(
            c => c.value === category,
          )
          if (!isCategory) {
            state.housesList.byCategories.push({
              value: category,
              text: category.charAt(0).toUpperCase() + category.slice(1),
            })
          }
        })
        

      })
  },
})

const { actions, reducer } = houseSlice

// Action creators are generated for each case reducer function
export const { setCategory, setCity, loadMore } = actions

export default reducer
