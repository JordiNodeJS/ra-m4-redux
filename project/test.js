/* eslint-disable no-console */
const  housesList = {}
const action = {}
action.payload = 'barcelona'
action.payload2 = 'garaje'

housesList.byId = {
  1: {
    id: 1,
    title: 'Piso 1',
    type: 'garaje',
    city: 'madrid',
    district: 'Gotic',
  },
  2: {
    id: 2,
    title: 'Piso 2',
    type: 'garaje',
    city: 'barcelona',
    district: 'Barceloneta',
  },
  3: {
    id: 3,
    title: 'Piso 3',
    type: 'piso',
    city: 'barcelona',
    district: 'Gotic',
  },
}

housesList[action.payload2] = Object.entries(housesList.byId)
      .filter(([, house]) => house.type === action.payload2)
      .map(([id]) => +id)



// console.log(housesList[action.payload2])

housesList[action.payload] = Object.keys(housesList.byId)
.filter(key => housesList.byId[key].city === action.payload)
.map(id => +id)

// console.log(Object.keys(housesList.byId)
// .filter(key => housesList.byId[key].city === action.payload))


// console.log(housesList[action.payload])

console.log(housesList.byId[2])