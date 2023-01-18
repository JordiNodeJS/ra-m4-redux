/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button } from '../atoms'
import { HouseCard } from '../molecules'
import { useFetch } from '../../hooks'
import { FlexBox, Grid } from '../../styles'
import { urls } from '../../constants'

const HousesStyled = styled(FlexBox)``

function Houses() {
  const [houses, setHouses] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const { data, loading, isError, isSuccess } = useFetch(urls.houses)

  const ITEMS_PER_PAGE = 9
  const totalPages = data ? Math.ceil(data.length / ITEMS_PER_PAGE) : 0

  const startLoading = page => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE
    const endIndex = page * 9
    const pisos = data.slice(startIndex, endIndex)
    setHouses(pisos)
  }

  useEffect(() => {
    if (data) startLoading(currentPage)
  }, [data, currentPage])

  return (
    <HousesStyled>
      {loading && <div>Loading...</div>}
      {isError && <div>Error</div>}
      {isSuccess && (
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
