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




  return (
    <Body>
      <h1>Lista de casas</h1>
      <ul>
        {Object.values(byId).map(house => (
          <li key={house.id}>{house.title}</li>
        ))}
      </ul>
    </Body>
  )
}

export default Data
