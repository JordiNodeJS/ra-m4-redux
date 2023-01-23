/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../atoms'
import { HouseCard } from '../molecules'
import { FlexBox, Grid } from '../../styles'
import { getHouses } from '../../store/slices/houseSlice'

const HousesStyled = styled(FlexBox)``

function Houses() {
  const [houses, setHouses] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const {
    housesList: { byId: data },
    reqStatus,
  } = useSelector(state => state.houses)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getHouses())
  }, [dispatch])
  
  const ITEMS_PER_PAGE = 9
  const totalPages = data ? Math.ceil(Object.values(data).length / ITEMS_PER_PAGE) : 0

  const startLoading = page => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE
    const endIndex = page * 9
    const pisos = Object.values(data).slice(startIndex, endIndex)
    setHouses(pisos)
  }

  useEffect(() => {
    if (data) startLoading(currentPage)
  }, [data, currentPage])

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
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          Load more
        </Button>
      </FlexBox>
    </HousesStyled>
  )
}

export default styled(Houses)``
