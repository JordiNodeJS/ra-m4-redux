/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Button } from '../atoms'
import { HouseCard } from '../molecules'
import { FlexBox, Grid } from '../../styles'
import { getHouses, loadMore } from '../../store/slices/houseSlice'

const HousesStyled = styled(FlexBox)``

function Houses() {
  const [houses, setHouses] = useState([])

  const { categorySelected, housesList, reqStatus } = useSelector(state => state.houses)
  const { byId, allIds, page } = housesList
  const category = housesList[categorySelected] ? [...housesList[categorySelected]] : []

  const currentPage = page || 1
  
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getHouses())
  }, [dispatch])
   
  const ITEMS_PER_PAGE = 9
  const totalPages = allIds
  ? Math.ceil(allIds.length / ITEMS_PER_PAGE)
  : 0

  
  const startLoading = page => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE
    const endIndex = page * ITEMS_PER_PAGE
    
    let data = allIds.map(key => byId[key])
    console.log('🥒', data)
    console.log('housesList[categorySelected]', housesList[categorySelected])
    if (housesList[categorySelected]?.length !== 0) {
      data = category.map(key => byId[key])
      console.log('🏘 category', categorySelected, category)
      console.log('🐒 data category', data)
    }
    // if (housesList[categorySelected] === 'all') {
    //   console.log('🏘 category', categorySelected, category)
    //   console.log('🐒 data category', data)
    //   data = allIds.map(key => byId[key])
    // }
    console.log('data after if', data)
    const pisos = data.slice(startIndex, endIndex)
    console.log('pisos', pisos)
    setHouses(pisos)
  }

  useEffect(() => {
    console.log('startLoading', currentPage )
    if (currentPage) startLoading(currentPage)
  }, [allIds, categorySelected, currentPage])

  const handleClick = () => dispatch(loadMore(currentPage + 1))


  return (
    <HousesStyled>
      {reqStatus === 'loading' && <div>Loading...</div>}
      {reqStatus === 'failed' && <div>Error</div>}
      {reqStatus === 'success' && (
        <Grid gridGap="32px">
          {houses.map(house => (
            <HouseCard
              key={house.id}
              title={house.title}
              price={`${house.price}€`}
              img={house.image}
              link=""
            />
          ))}
        </Grid>
      )}
      <FlexBox align="center">
        <Button
          style={{ marginTop: '2rem' }}
          onClick={handleClick}
          // disabled={currentPage >= totalPages}
        >
          Load more
        </Button>
      </FlexBox>
    </HousesStyled>
  )
}

export default styled(Houses)``
