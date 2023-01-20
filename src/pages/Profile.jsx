import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Text } from '../components/atoms'
import { Body } from '../components/layout'
import { InputTextGroup } from '../components/molecules'
import { selectUser } from '../store/userSlice'
import { Container, FlexBox } from '../styles'


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
const UpdateForm = () => {
  const user = useSelector(selectUser)
  const [formData, setFormData] = useState({ ...user })

  return (
    <FlexBox as="form">
      <InputTextGroup
        value={formData.name}
        label="Nombre"
        id="nombre"
        onChange={e => setFormData({ ...formData, name: e.target.value })}
      />
      <InputTextGroup
        value={formData.surnames.first}
        label="Apellido"
        id="apellido"
        onChange={e =>
          setFormData({
            ...formData,
            surnames: { ...formData.surnames, first: e.target.value },
          })
        }
      />
    </FlexBox>
  )
}

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
