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
  
  const { categorySelected, housesList, reqStatus, page } = useSelector(state => state.houses)
  const { byId, allIds } = housesList
  const category = housesList[categorySelected] ? [...housesList[categorySelected]] : []
  

 
  
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getHouses())
  }, [dispatch])
   
  const ITEMS_PER_PAGE = 9
  const totalPages = allIds
  ? Math.ceil(allIds.length / ITEMS_PER_PAGE)
  : 0

  
  const startLoading = (p = 1) => {
    const startIndex = (p - 1) * ITEMS_PER_PAGE
    const endIndex = p * ITEMS_PER_PAGE
    
    let data = allIds.map(key => byId[key])
    console.log('🥒', data)
    console.log('housesList[categorySelected]', housesList[categorySelected])
    if (Array.isArray(housesList[categorySelected]) && housesList[categorySelected].length ) {
      // if (housesList[categorySelected] === 'allIds') {
      //   console.log('🏘 🧨 category', categorySelected, category)
      //   console.log('🧨 data category', data)
      //   data = allIds.map(key => byId[key])
      //   return
      // }
      data = category.map(key => byId[key])
      console.log('🏘 category', categorySelected, category)
      console.log('🐒 data category', data)
    }

    console.log('data after if', data)
    const pisos = data.slice(startIndex, endIndex)
    console.log('pisos', pisos)
    setHouses(pisos)
  }

  useEffect(() => {
    console.log('startLoading', page )
    startLoading(page)
  }, [allIds, categorySelected, page])

  const handleClick = () => dispatch(loadMore(page))


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
