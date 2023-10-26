import React from 'react'
import TextInputWhitLabel from '../../components/TextInputWhitLabel'
import SButton from '../../components/Button'

import { Figure, Form } from 'react-bootstrap'
import { config } from '../../config'

const spekersForm = ({
    form,
    hendeleChange,
    hendeleSubmit,
    isLoading,
    edit
}) => {
    return (
        <Form>
            <TextInputWhitLabel
                value={form.name}
                label={'Nama'}
                name='name'
                type='text'
                onChange={hendeleChange}
                placeholder={'Masukan Nama Pembicara'}

            />
            <TextInputWhitLabel
                value={form.role}
                label={'Role'}
                name='role'
                type='text'
                onChange={hendeleChange}
                placeholder={'Masukan Role'}
            />
            <TextInputWhitLabel
                // value={form.avatar}
                label={'Avatar'}
                name='avatar'
                type='file'
                onChange={hendeleChange}
                placeholder={'Masukan Avatar'}
            />

            {form.avatar !== '' && (
                <div>
                    <Figure>
                        <Figure.Image
                            width={171}
                            height={180}
                            alt='171x189'
                            src={`${config.api_image}/${form.avatar}`}
                        />
                        <Figure.Caption>Preview Image Avatar</Figure.Caption>
                    </Figure>
                </div>
            )}

            <SButton
                action={hendeleSubmit}
                loading={isLoading}
            >
                {edit ? 'Ubah' : 'Simpan'}
            </SButton>
        </Form>
    )
}

export default spekersForm