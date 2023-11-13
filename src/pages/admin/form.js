import React from 'react'
import { Form } from 'react-bootstrap'
import TextInputWhitLabel from '../../components/TextInputWhitLabel'
import SButton from '../../components/Button'
import SelectBox from '../../components/SelectBox'

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
            
            <SelectBox
                name='role'
                placeholder={'Masukan Admin'}
                value={form.role}
                label={'Role'}
                options={[
                    {
                        label: 'admin',
                        value: 'admin',
                        target: {name: 'role', value: 'admin'}
                    }
                ]}
                hendleChange={(e) => hendleChange(e)}
             />

            <SButton action={hendleSubmit} loading={isLoading}>
                Simpan
            </SButton>
        </Form>
    )
}

export default form