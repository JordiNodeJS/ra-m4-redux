import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { main } from '../../constants'
import { colors, weight } from '../../styles'

const MainMenuStyled = styled.ul`
  ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      margin-left: 1rem;
      &:first-child {
        margin-left: 0;
      }
    }
    a {
      text-decoration: none;
      &:visited {
        color: ${colors.font.headings};
      }
    }
    & .active {
      color: ${colors.font.base} !important;
      font-weight: ${weight.bolder};
    }
  }
`

function MainMenu() {
  return (
    <MainMenuStyled>
      <ul>
        {Object.values(main).map(({ path, label }) => (
          <li key={path}>
            <NavLink key={path} to={path} label={label}>
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </MainMenuStyled>
  )
}

export default styled(MainMenu)``
