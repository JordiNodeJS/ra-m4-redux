import styled from 'styled-components'
import { colors, dimensions } from '../../styles'

const getOrder = order => {
  switch (order) {
    case 2:
      return 'h2'
    case 3:
      return 'h3'
    case 4:
      return 'h4'
    case 5:
      return 'h5'
    case 6:
      return 'h6'

    default:
      return 'h1'
  }
}

const Title = styled.h1.attrs({
  as: "h1",
})`
  color: ${({ color }) => color || colors.text.headings};
  font-size: ${({ fontSize, order }) =>
    fontSize || dimensions.font[order || 'h1']};
`

export default Title
