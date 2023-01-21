import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getHouses } from '../store/slices/houseSlice'
import { Body } from '../components/layout'

function Data() {
  const dispatch = useDispatch()
  const { housesList } = useSelector(state => state.houses)

  useEffect(() => {
    dispatch(getHouses())
  }, [dispatch])

  useEffect(() => {
    console.log('houses', housesList)
  }, [housesList])

  return (
    <Body>
      <h1>Lista de casas</h1>
      <ul>
        {housesList.map(house => (
          <li key={house.id}>{house.title}</li>
        ))}
      </ul>
    </Body>
  )
}

export default Data
