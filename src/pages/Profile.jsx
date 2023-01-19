import { useSelector } from 'react-redux'
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
      <p>
        <strong>Nombre:</strong>: {user.name}
      </p>
      <p>
        <strong>Apellido:</strong>: {user.surnames.first}
      </p>
    </FlexBox>
  )
}
// eslint-disable-next-line react/function-component-definition
const UpdateForm = () => (
  <FlexBox as="form">
    <h2>Form</h2>
    <InputTextGroup label="Nombre" id="nombre" onChange={handleChange} />
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
