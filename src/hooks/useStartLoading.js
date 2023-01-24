/* eslint-disable no-console */
import { useState } from "react"
import { useSelector } from "react-redux"


export default function useStartLoading() {
  const [houses, setHouses] = useState([])
  const { categorySelected, housesList } = useSelector(state => state.houses)
  const { byId, allIds } = housesList
  const category = housesList[categorySelected] ? [...housesList[categorySelected]] : []

  const startLoading = (p = 1) => {
    const ITEMS_PER_PAGE = 9

    let data = allIds.map(key => byId[key])
    console.log('🥒', data)
    console.log('housesList[categorySelected]', housesList[categorySelected])
    if (Array.isArray(housesList[categorySelected]) && housesList[categorySelected].length ) {
      data = category.map(key => byId[key])
      console.log('🏘 category', categorySelected, category)
      console.log('🐒 data category', data)
    }

    console.log('data after if', data)

    let pisos
    const { length } = data

    length >= ITEMS_PER_PAGE
      ? pisos = data.slice((p - 1) * ITEMS_PER_PAGE, p * ITEMS_PER_PAGE)
      : pisos = data

    console.log('pisos', pisos)
    setHouses(pisos)
}

  return { houses, startLoading }

}