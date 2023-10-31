import React from 'react'
import { Form } from 'react-bootstrap'
import Select from 'react-select'

const SelectBox = ({
    name,
    options,
    isClearable,
    placeholder,
    hendleChange,
    label,
    value
}) => {
    return (
        <Form.Group className='mb-2'>
            {label && <Form.Label>{label}</Form.Label>}
            <Select
                name={name}
                isClearable={isClearable}
                placeholder={placeholder}
                onChange={hendleChange}
                options={options}
                value={value}
            />
        </Form.Group>
    )
}

export default SelectBox