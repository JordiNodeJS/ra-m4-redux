// @filename: userSlice.js

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { urls } from '../../constants'

// thunks
// Añadir un reject como en la documentación.
// Pasar parametros aquí para cargar más -> Por cierto, ahora al cargar más lo tienes como una paginación, no como un cargar más que añade más debajo
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
      byCities: [{ value: 'allIds', text: 'All' }], //  byCities: [{value: 'madrid', text: 'Madrid' }, {...}, {..}]
      byCategories: [{ value: 'allIds', text: 'All' }], // byCategories:  [{value: 'garaje', text: 'Garaje' }, {...}, {..}]
      allIds: [],
      byId: {},
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
    // Llamarlo setCategory
    selectCategory: (state, action) => {
      state.categorySelected = action.payload // <-- category
      // Demasiado complejo, trata de simplificarlo
      // No tiene sentido que puedas entrar a housesLists byId desde selectCategory...
      if (action.payload !== 'allIds') {
        state.housesList[action.payload] = Object.entries(state.housesList.byId)
          .filter(([, house]) => house.type === action.payload)
          .map(([id]) => +id)
      }
      state.categorySelected === 'allIds' && (state.page = 1)
    },
    // Llamarlo setCity
    selectCity: (state, action) => {
      state.citySelected = action.payload // <-- city
      // Simplificar
      if (action.payload !== 'allIds') {
        state.housesList[action.payload] = Object.keys(state.housesList.byId)
          .filter(key => state.housesList.byId[key].city === action.payload)
          .map(id => +id)
      }
      state.categorySelected === 'allIds' && (state.page = 1)
    },
    // No hace falta que este aquí
    loadMore: (state, action) => {
      state.page = +action.payload + 1
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
      .addCase(getHouses.fulfilled, (state, action) => {
        // <-- houses from the API arrive here
        state.reqStatus = 'success'

        action.payload.forEach(house => {
          // <-- for each individual house we do the next things
          const { id, city, type: category } = house

          if (!state.housesList.allIds.includes(id)) {
            state.housesList.allIds.push(id)
          }
          // CITIES 🏙 - No es necesario
          const isCity = state.housesList.byCities.find(c => c.value === city)
          if (!isCity) {
            state.housesList.byCities.push({
              value: city,
              text: city.charAt(0).toUpperCase() + city.slice(1),
            })
            state.housesList[city] = [] // create states base on cities ex. barcelona: [3, 5, 6]
          }

          // CATEGORIES 🏡🏰 - No es necesario
          const isCategory = state.housesList.byCategories.find(
            c => c.value === category,
          )
          if (!isCategory) {
            state.housesList.byCategories.push({
              value: category,
              text: category.charAt(0).toUpperCase() + category.slice(1),
            })
          }
          state.housesList.byId[id] = house
        })
      })
  },
})

const { actions, reducer } = houseSlice

// Action creators are generated for each case reducer function
export const { selectCategory, selectCity, loadMore } = actions

export default reducer
