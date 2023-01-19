import { useSelector } from 'react-redux'
import { Text } from '../components/atoms'
import { Body } from '../components/layout'
import { InputTextGroup } from '../components/molecules'
import { selectUser } from '../store/userSlice'
import { Container, FlexBox } from '../styles'

const handleChange = _ => {}

// eslint-disable-next-line react/function-component-definition
const UserProfile = () => {
  const user = useSelector(selectUser)
  return (
    <FlexBox>
      <Text>
        <strong>Nombre:</strong>: {user.name}
      </Text>
      <Text>
        <strong>Apellido:</strong>: {user.surnames.first}
      </Text>
    </FlexBox>
  )
}
// eslint-disable-next-line react/function-component-definition
const UpdateForm = () => (
  <FlexBox as="form">
    <InputTextGroup label="Nombre" id="nombre" onChange={handleChange} />
    <InputTextGroup label="Apellido" id="apellido" onChange={handleChange} />
  </FlexBox>
)

function Profile() {
  return (
    <Body>
      <Container direaction="row">
        <UserProfile />
        <UpdateForm />
      </Container>
    </Body>
  )
}

export default Profile
