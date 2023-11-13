import React from 'react'
import { Form } from 'react-bootstrap'
import TextInputWhitLabel from '../../components/TextInputWhitLabel'
import SButton from '../../components/Button'
import SelectBox from '../../components/SelectBox'

const OrganizersForm = ({
    hendleChange,
    hendleSubmit,
    isLoading,
    form,
    edit
}) => {
    return (
        <Form>
            <TextInputWhitLabel
                name='organizer'
                label={'Organizer'}
                placeholder={'Masukan Nama Organizer'}
                type='text'
                value={form.organizer}
                onChange={hendleChange}
            />

            <TextInputWhitLabel
                name='name'
                label={'Nama'}
                placeholder={'Masukan Nama'}
                type='text'
                value={form.name}
                onChange={hendleChange}
            />

            <TextInputWhitLabel
                name='email'
                label={'Email'}
                placeholder={'Masukan Email'}
                type='email'
                value={form.email}
                onChange={hendleChange}
            />

            <TextInputWhitLabel
                name='password'
                label={'Password'}
                placeholder={'Masukan password'}
                type='password'
                value={form.password}
                onChange={hendleChange}
            />

            <TextInputWhitLabel
                name='confirmPassword'
                label={'Confirm Password'}
                placeholder={'Confirm password'}
                type='password'
                value={form.confirmPassword}
                onChange={hendleChange}
            />

            <SelectBox
                label={'Role'}
                placeholder={'Masukan Role'}
                name='role'
                value={form.role}
                options={[
                    {
                        label: 'organizer',
                        value: 'organizer',
                        target: { name: 'role', value: 'organizer' }
                    }
                ]}
                isClearable={true}
                hendleChange={(e) => hendleChange(e)}
            />

            <SButton
                loading={isLoading}
                action={hendleSubmit}
            >
                Smpan
            </SButton>
        </Form>
    )
}

export default OrganizersForm