import React from 'react'
import { Form } from 'react-bootstrap'

const SearchInput = ({hendeleChange, query, disabled}) => {
    return (
        <Form.Group className='mb-3'>
            <Form.Control
                type='text'
                value={query}
                disabled={disabled}
                onChange={hendeleChange}
                placeholder='Masukan Pencarian'
            />
        </Form.Group>
    )
}

export default SearchInput