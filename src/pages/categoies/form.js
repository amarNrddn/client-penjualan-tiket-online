import React from 'react'
import SButton from '../../components/Button'
import TextInputWhitLabel from '../../components/TextInputWhitLabel'

import { Form } from 'react-bootstrap'

const CategoriesForm = ({ form, hendeleChange, hendeleSubmit, edit, isLoading }) => {
    return (
        <Form>
            <TextInputWhitLabel
                type='text'
                value={form.name}
                name='name'
                placeholder={'Masukan nama Kategori'}
                label={'Nama Kategori'}
                onChange={hendeleChange}
            />
            <SButton
                action={hendeleSubmit}
                loading={isLoading}
            >
                {edit ? 'Ubah' : 'Simpan'}
            </SButton>
        </Form>
    )
}

export default CategoriesForm