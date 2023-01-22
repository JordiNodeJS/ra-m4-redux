import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import {
  getHouses,
  selectCategory,
  selectCity,
} from '../../store/slices/houseSlice'
import { colors, Container, dimensions, FlexBox } from '../../styles'
import { Button, Icon } from '../atoms'
import { SelectGroup } from '../molecules'

const SubHeaderStyled = styled(FlexBox)`
  padding-top: ${dimensions.spacing.xl};
  padding-bottom: ${dimensions.spacing.xl};
  background-color: ${colors.clearBlueBg};
  border-top: 1px solid ${colors.border.clearBlueBg};
  border-bottom: 1px solid ${colors.border.clearBlueBg};
`

const FormStyled = styled(FlexBox).attrs({ as: 'form' })`
  ${SelectGroup} {
    &:first-of-type {
      padding: 0.5rem 1rem;
      border-radius: 4px;
      margin-right: 1rem;
    }
  }

  ${Button} {
    background-color: ${colors.blue};
  }
`

function SubHeader({ ...props }) {
  const dispatch = useDispatch()
  const {
    housesList: { byCities, byCategories },
    categorySelected,
    citySelected,
  } = useSelector(state => state.houses)

  useEffect(() => {
    dispatch(getHouses())
  }, [dispatch])

  useEffect(() => {
    dispatch(selectCategory(''))
  }, [dispatch])

  // handles
  const handleChangeCategory = e => dispatch(selectCategory(e.target.value))
  const handleChangeCity = e => dispatch(selectCity(e.target.value))

  return (
    <SubHeaderStyled {...props}>
      <Container>
        <FormStyled direction="row" align="center">
          <SelectGroup
            id="type"
            label="Tipo"
            hideLabel
            defaultText="Piso, chalet o garaje..."
            options={byCategories}
            onChange={handleChangeCategory}
            value={categorySelected}
          />

          <SelectGroup
            id="ciudad"
            label="Ciudad"
            defaultText="Madrid, Barcelona o Zaragoza..."
            hideLabel
            options={byCities}
            onChange={handleChangeCity}
            value={citySelected}
          />

          <Button>
            <Icon icon="search" />
          </Button>
        </FormStyled>
      </Container>
    </SubHeaderStyled>
  )
}

export default styled(SubHeader)``
