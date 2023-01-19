import PropTypes from 'prop-types'
import styled from 'styled-components'
import { dimensions } from '../../styles'
import { InputText, Label } from '../atoms'

const InputTextGroupStyled = styled.div`
  ${InputText} {
    margin-left: ${dimensions.spacing.sm};
  }
`

export function InputTextGroup({ label, id, onChange, ...rest }) {
  return (
    <InputTextGroupStyled>
      <Label htmlFor={id}>{label}</Label>
      <InputText type="text" id={id} name={id} onChange={onChange} {...rest} />
    </InputTextGroupStyled>
  )
}

InputTextGroup.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default styled(InputTextGroup)``
