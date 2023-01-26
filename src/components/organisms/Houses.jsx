import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Button } from '../atoms'
import { HouseCard } from '../molecules'
import { FlexBox, Grid } from '../../styles'
import { getHouses } from '../../store/slices/houseSlice'
import { getFilteredByIds } from '../../utils/filters'

const HousesStyled = styled(FlexBox)``

function Houses() {
  const [page, setPage] = useState(1)
  const {
    housesList: { byId, filterIds },
    reqStatus,
  } = useSelector(state => state.houses)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getHouses(page))
    console.log(filterIds)
    console.log(byId)
    console.log('result', getFilteredByIds(byId, filterIds))
  }, [dispatch, page])
  

  const handleClick = () => {
    setPage(page + 1)
  }

  return (
    <HousesStyled>
      {reqStatus === 'loading' && <div>Loading...</div>}
      {reqStatus === 'failed' && <div>Error</div>}
      {reqStatus === 'success' && (
        <Grid gridGap="32px">
          {getFilteredByIds(byId, filterIds).map(house => (
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
        <Button style={{ marginTop: '2rem' }} onClick={handleClick}>
          Load more
        </Button>
      </FlexBox>
    </HousesStyled>
  )
}

export default styled(Houses)``
