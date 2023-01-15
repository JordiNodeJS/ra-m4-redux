import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { main } from '../../constants'

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
    }
  }
`

function MainMenu() {
  return (
    <MainMenuStyled>
      <ul>
        {Object.values(main).map(({ path, label }) => (
          <li>
            <Link key={path} to={path} label={label}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </MainMenuStyled>
  )
}

export default styled(MainMenu)``
