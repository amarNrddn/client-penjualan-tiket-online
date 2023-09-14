import React from 'react'
import { Form } from 'react-bootstrap'

const TextInput = ({ name, value, placeholder, onChange, type }) => {
    return (
        <Form.Control
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
        />
    )
}

export default TextInput