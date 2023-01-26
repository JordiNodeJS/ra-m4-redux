/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Button } from '../atoms'
import { HouseCard } from '../molecules'
import { FlexBox, Grid } from '../../styles'
import { categoryHouses, cityHouses, allHouses } from '../../utils/filters'
import { getHouses } from '../../store/slices/houseSlice'

const HousesStyled = styled(FlexBox)``

function Houses() {
  const [page, setPage] = useState(1)
  const [houses, setHouses] = useState([])
  const {
    housesList: { byId },
    categorySelected: category,
    citySelected: city,
    reqStatus,
  } = useSelector(state => state.houses)
  const dispatch = useDispatch()

  // pagination
  const ITEMS_PER_PAGE = 9

  const disable = () => {
    const all = allHouses(byId)
    const totalPages = all.length ? Math.ceil(all.length / ITEMS_PER_PAGE) : 0

    return page >= totalPages
  }

  //   Esta función es innecesaria
  const slicePage = (_allHouses, p) => {
    const { length } = _allHouses

    const pisos =
      length >= ITEMS_PER_PAGE
        ? _allHouses.slice((p - 1) * ITEMS_PER_PAGE, p * ITEMS_PER_PAGE)
        : _allHouses

    console.log('all', _allHouses)
    console.log('pisos 🎈', pisos)
    console.log('page 🎈', p)
    setHouses(pisos)
  }

  //  Continuas sin usar el loadMore pasando parametros al thunk
  useEffect(() => {
    slicePage(allHouses(byId), page)
  }, [byId, page])

  const handleClick = () => {
    setPage(page + 1)
  }

  useEffect(() => {
    dispatch(getHouses())
  }, [dispatch])

  //   Ambos useEffect son innecesarios, deberías de filtrar abajo como se indico en la anterior review
  useEffect(() => {
    setHouses(categoryHouses({ byId, category }))
  }, [category])

  //   Ambos useEffect son innecesarios, deberías de filtrar abajo como se indico en la anterior review
  useEffect(() => {
    setHouses(cityHouses({ byId, city }))
  }, [city])

  return (
    <HousesStyled>
      {reqStatus === 'loading' && <div>Loading...</div>}
      {reqStatus === 'failed' && <div>Error</div>}
      {reqStatus === 'success' && (
        <Grid gridGap="32px">
          {/* Continuas sin filtrar aquí. */}
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
          disabled={disable()}
        >
          Load more
        </Button>
      </FlexBox>
    </HousesStyled>
  )
}

export default styled(Houses)``
