import React from 'react'
import { Form } from 'react-bootstrap'
import TextInputWhitLabel from '../../components/TextInputWhitLabel'
import SButton from '../../components/Button'

const form = ({
    form,
    hendleChange,
    isLoading,
    hendleSubmit
}) => {
    return (
        <Form>
            <TextInputWhitLabel
                name='name'
                type='text'
                label={'Nama'}
                placeholder={'Masukan Nama'}
                value={form.name}
                onChange={hendleChange}
            />
            <TextInputWhitLabel
                name='email'
                type='email'
                label={'Email'}
                placeholder={'Masukan Email'}
                value={form.email}
                onChange={hendleChange}
            />
            <TextInputWhitLabel
                name='password'
                type='password'
                label={'Password'}
                placeholder={'Masukan Password'}
                value={form.password}
                onChange={hendleChange}
            />
            <TextInputWhitLabel
                name='confirmPassword'
                type='password'
                label={'Confirm Password'}
                placeholder={'Confirm Password'}
                value={form.confirmPassword}
                onChange={hendleChange}
            />
            <TextInputWhitLabel
                name='role'
                type='text'
                label={'Role'}
                placeholder={'Masukan Role'}
                value={form.role}
                onChange={hendleChange}
            />

            <SButton action={hendleSubmit} loading={isLoading}>
                Simpan
            </SButton>
        </Form>
    )
}

export default form