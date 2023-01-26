import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Button } from '../atoms'
import { HouseCard } from '../molecules'
import { FlexBox, Grid } from '../../styles'
import { getHouses } from '../../store/slices/houseSlice'

const HousesStyled = styled(FlexBox)``

function Houses() {
  const [page, setPage] = useState(1)
  const {
    housesList: houses,

    reqStatus,
  } = useSelector(state => state.houses)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getHouses(page))
  }, [page])

  const handleClick = () => {
    setPage(page + 1)
  }

  return (
    <HousesStyled>
      {reqStatus === 'loading' && <div>Loading...</div>}
      {reqStatus === 'failed' && <div>Error</div>}
      {reqStatus === 'success' && (
        <Grid gridGap="32px">
          {houses.filterIds
            ? houses.filterIds
                .map(id => houses.byId[id])
                .map(house => (
                  <HouseCard
                    key={house.id}
                    title={house.title}
                    price={`${house.price}€`}
                    img={house.image}
                    link=""
                  />
                ))
            : houses.allIds
                .map(id => houses.byId[id])
                .map(house => (
                  <HouseCard
                    key={house.id}
                    title={house.title}
                    price={`${house.price}€`}
                    img={house.image}
                    link=""
                  />
                ))}
          {}
        </Grid>
      )}
      <FlexBox align="center">
        <Button
          style={{ marginTop: '2rem' }}
          onClick={handleClick}
        >
          Load more
        </Button>
      </FlexBox>
    </HousesStyled>
  )
}

export default styled(Houses)``
