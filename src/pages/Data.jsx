/* eslint-disable react/function-component-definition */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getHouses } from '../store/slices/houseSlice'
import { Body } from '../components/layout'

function Data() {
  const dispatch = useDispatch()
  const { byId } = useSelector(state => state.houses.housesList)

  useEffect(() => {
    dispatch(getHouses())
  }, [dispatch])

  useEffect(() => {
    console.log('houses', byId)
  }, [byId])

  const renderHouses = Object.values(byId).map(house => (
    <li key={house.id}>
      {house.title} <img src={house.image} alt={house.title} width={20} />
    </li>
  ))

  return (
    <Body>
      <h1>Lista de casas</h1>
      <ul>{renderHouses}</ul>
    </Body>
  )
}

export default Data
