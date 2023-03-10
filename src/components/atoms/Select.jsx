import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export const SelectOption = styled.option``

function Select({ id, name, onChange, children, value, ...rest }) {
  return (
    <select id={id} name={name} onChange={onChange} {...rest}>
      {children}
    </select>
  )
}

Select.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
}

export default styled(Select)``
