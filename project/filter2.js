/* eslint-disable no-console */
/* eslint-disable no-shadow */
const byId = { 1: {
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
5: {
  id: 5,
  title: 'Piso 5',
  price: 555000,
  image: 'https://kevinmamaqi.com/static/casas/5.jpg',
  type: 'garaje',
  city: 'zaragoza',
  district: 'Gotic',
  createdAt: '2022-08-13:14:41.000Z',
  updatedAt: '2022-08-13:14:41.000Z',
},
6: {
  id: 6,
  title: 'Piso 6',
  price: 139000,
  image: 'https://kevinmamaqi.com/static/casas/6.jpg',
  type: 'garaje',
  city: 'barcelona',
  district: 'Gotic',
  createdAt: '2022-01-29:13:13.000Z',
  updatedAt: '2022-01-29:13:13.000Z',
},
7: {
  id: 7,
  title: 'Piso 7',
  price: 415000,
  image: 'https://kevinmamaqi.com/static/casas/7.jpg',
  type: 'chalets',
  city: 'barcelona',
  district: 'Gotic',
  createdAt: '2014-11-13:13:13.000Z',
  updatedAt: '2014-11-13:13:13.000Z',
},
8: {
  id: 8,
  title: 'Piso 8',
  price: 315000,
  image: 'https://kevinmamaqi.com/static/casas/8.jpg',
  type: 'chalets',
  city: 'madrid',
  district: 'Gotic',
  createdAt: '2018-02-15:13:13.000Z',
  updatedAt: '2018-02-15:13:13.000Z',
},
9: {
  id: 9,
  title: 'Piso 9',
  price: 250000,
  image: 'https://kevinmamaqi.com/static/casas/9.jpg',
  type: 'chalets',
  city: 'madrid',
  district: 'Gotic',
  createdAt: '2017-03-05:05:13.000Z',
  updatedAt: '2017-03-05:05:13.000Z',
},
10: {
  id: 10,
  title: 'Piso 10',
  price: 215000,
  image: 'https://kevinmamaqi.com/static/casas/10.jpg',
  type: 'garaje',
  city: 'barcelona',
  district: 'Gotic',
  createdAt: '2017-07-12:35:13.000Z',
  updatedAt: '2017-07-12:35:13.000Z',
},
11: {
  id: 11,
  title: 'Piso 11',
  price: 199000,
  image: 'https://kevinmamaqi.com/static/casas/11.jpg',
  type: 'piso',
  city: 'zaragoza',
  district: 'Gotic',
  createdAt: '2017-09-14:14:51.000Z',
  updatedAt: '2017-09-14:14:51.000Z',
},
}

const filterArray = ['3', '4']
// const filterArray = [3, 5]


// const getFilteredByIds2 = (byId, filterArray) => {
//   let resultArray;

//   if (filterArray.length === 0) {
//       resultArray = Object.values(byId);
//   } else {
//       resultArray = filterArray.map(id => byId[id])
//           .filter(Boolean);
//   }

//   resultArray.sort((a, b) => a.id - b.id);

//   return resultArray;
// }

// console.log(getFilteredByIds2(byId, filterArray));

const getFilteredByIds = (byId, filterArray = []) => 
    Object.values(byId)
        .filter(item => filterArray.length === 0 || filterArray.map(Number).includes(item.id))
        .sort((a, b) => a.id - b.id);

console.log(getFilteredByIds(byId, filterArray));