import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Text } from '../components/atoms'
import { Body } from '../components/layout'
import { InputTextGroup } from '../components/molecules'
import { selectUser, updateFirstSurname, updateName } from '../store/slices/userSlice'
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
  const [userFormData, setUserFormData] = useState({ ...user })
  const dispatch = useDispatch()

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(updateName(userFormData.name))
    dispatch(updateFirstSurname(userFormData.surnames.first))
  }

  return (
    <FlexBox as="form" onSubmit={handleSubmit}>
      <InputTextGroup
        value={userFormData.name}
        label="Nombre"
        id="nombre"
        onChange={e =>
          setUserFormData({ ...userFormData, name: e.target.value })
        }
      />
      <InputTextGroup
        value={userFormData.surnames.first}
        label="Apellido"
        id="apellido"
        onChange={e =>
          setUserFormData({
            ...userFormData,
            surnames: { ...userFormData.surnames, first: e.target.value },
          })
        }
      />
      <Button type="submit" onClick={handleSubmit}>Cambia Redux</Button>
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
