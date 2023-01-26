const byId = {
  1: {
    id: 1,
    title: 'Piso 1',
    price: 100000,
    image: 'https://kevinmamaqi.com/static/casas/1.jpg',
    type: 'garaje',
    city: 'madrid',
    district: 'Gotic',
    published: true,
    createdAt: '2020-05-01T00:00:00.000Z',
    updatedAt: '2020-05-01T00:00:00.000Z',
  },
  2: {
    id: 2,
    title: 'Piso 2',
    price: 838000,
    image: 'https://kevinmamaqi.com/static/casas/2.jpg',
    type: 'chalets',
    city: 'barcelona',
    district: 'Barceloneta',
    createdAt: '2020-03-04T00:13:44.000Z',
    updatedAt: '2020-03-04T00:13:44.000Z',
  },
  3: {
    id: 3,
    title: 'Piso 3',
    price: 423900,
    image: 'https://kevinmamaqi.com/static/casas/3.jpg',
    type: 'piso',
    city: 'zaragoza',
    district: 'Gotic',
    createdAt: '2021-10-04T01:13:44.000Z',
    updatedAt: '2021-10-04T01:13:44.000Z',
  },
  4: {
    id: 4,
    title: 'Piso 4',
    price: 324900,
    image: 'https://kevinmamaqi.com/static/casas/4.jpg',
    type: 'garaje',
    city: 'zaragoza',
    district: 'Gotic',
    createdAt: '2021-03-15:22:41.000Z',
    updatedAt: '2021-03-15:22:41.000Z',
  },
}


const filterHouse = (_byId, selection, payload) =>
  Object.entries(_byId)
    .filter(([, house]) => house[selection] === payload)
    .map(house => house[0])


console.log('garaje', filterHouse(byId, 'type', 'garaje')) 
console.log('piso', filterHouse(byId, 'type', 'piso')) 
console.log('barcelona', filterHouse(byId, 'city', 'barcelona')) 
console.log('zaragoza', filterHouse(byId, 'city', 'zaragoza')) 
