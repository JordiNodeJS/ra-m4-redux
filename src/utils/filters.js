// category selected
export const categoryHouses = ({ byId ={}, category }) => 
   Object.entries(byId)
    .filter(([, house]) => house.type === category)
    .map(house => house[1])

// city selected
// Array Houses [{...}, {...}, ...]
export const cityHouses = ({ byId = {}, city }) =>
  Object.entries(byId)
    .filter(([, house]) => house.city === city)
    .map(house => house[1])

// Array Houses [{...}, {...}, ...]
export const allHouses = (byId = {}) => Object.keys(byId).map(id => byId[id])
