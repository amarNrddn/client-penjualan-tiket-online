import React from 'react'
import SButton from '../../components/Button'
import TextInputWhitLabel from '../../components/TextInputWhitLabel'

import { Figure, Form } from 'react-bootstrap'
import { config } from '../../config'

const PaymentForm = ({
    form,
    hendeleChange,
    edit,
    isLoading,
    hendeleSubmit
}) => {
    return (
        <Form>
            <TextInputWhitLabel
                type='text'
                value={form.type}
                name='type'
                label={'Type'}
                onChange={hendeleChange}
                placeholder={'Masukan Type'}
            />
            <TextInputWhitLabel
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
                loading={isLoading}
                action={hendeleSubmit}
            >
                {edit ? 'Ubah' : 'Simpan'}
            </SButton>
        </Form>
    )
}

export default PaymentForm