import React from 'react'
import TextInputWhitLabel from '../../components/TextInputWhitLabel'
import SButton from '../../components/Button'

import { Figure, Form } from 'react-bootstrap'
import { config } from '../../config'

const spekersForm = ({
    form,
    handleChange,
    handleSubmit,
    isLoading,
    edit
}) => {
    return (
        <Form>
            <TextInputWhitLabel
                value={form.name}
                label={'Nama'}
                name='nama'
                type='text'
                onChange={handleChange}
                placeholder={'Masukan Nama Pembicara'}

            />
            <TextInputWhitLabel
                value={form.role}
                label={'Role'}
                name='role'
                type='text'
                onChange={handleChange}
                placeholder={'Masukan Role'}
            />
            <TextInputWhitLabel
                value={form.avatar}
                label={'Avatar'}
                type='file'
                onChange={handleChange}
                placeholder={'Masukan Avatar'}
            />

            {form.avatar !== '' && (
                <div>
                    <Figure
                        width={171}
                        height={180}
                        alt='171x189'
                        src={`${config.api_image}/${form.avatar}`}
                    >
                        <Figure.Caption>Preview Image Avatar</Figure.Caption>
                    </Figure>
                </div>
            )}

            <SButton
                action={handleSubmit}
                loading={isLoading}
            >
                {edit ? 'Ubah' : 'Simpan'}
            </SButton>
        </Form>
    )
}

export default spekersForm