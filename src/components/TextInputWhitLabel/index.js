import React from 'react'
import { Form } from 'react-bootstrap'
import TextInput from '../TextInput'

const TextInputWhitLabel = ({ name, value, label, onChange, placeholder, type }) => {
    return (
        <Form.Group className='mb-2'>
            <Form.Label>{label}</Form.Label>
            <TextInput
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
            />
        </Form.Group>
    )
}

export default TextInputWhitLabel