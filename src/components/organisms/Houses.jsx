/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Button } from '../atoms'
import { HouseCard } from '../molecules'
import { FlexBox, Grid } from '../../styles'
import { getHouses, loadMore } from '../../store/slices/houseSlice'
import { useStartLoading } from '../../hooks'

const HousesStyled = styled(FlexBox)``

function Houses() {
  const {
    housesList: { allIds },
    categorySelected,
    reqStatus,
    page,
  } = useSelector(state => state.houses)

  const { houses, startLoading } = useStartLoading()

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getHouses())
  }, [dispatch])

  // pagination
  const isDisabled = () => {
    const ITEMS_PER_PAGE = 9
    const totalPages = allIds ? Math.ceil(allIds.length / ITEMS_PER_PAGE) : 0

    return page >= totalPages
  }

  useEffect(() => {
    console.log('startLoading', page)
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
          disabled={isDisabled()}
        >
          Load more
        </Button>
      </FlexBox>
    </HousesStyled>
  )
}

export default styled(Houses)``
