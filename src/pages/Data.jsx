import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getHouses } from '../store/slices/houseSlice'
import { Body } from '../components/layout'

function Data() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getHouses())
  }, [dispatch])

  return <Body>Mi perfil</Body>
}

export default Data
