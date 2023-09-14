import React from 'react'
import { Form } from 'react-bootstrap'
import SButton from '../../components/Button'
import TextInputWhitLabel from '../../components/TextInputWhitLabel'

const SForm = ({ form, hendeleOnchange, hendeleSubmit, loading }) => {
    return (
        <Form>
            <TextInputWhitLabel
                label={"Email"}
                type='email'
                name='email'
                value={form.email}
                placeholder={'email addres'}
                onChange={hendeleOnchange}
            />

            <TextInputWhitLabel
                label={"Password"}
                type="password"
                name="password"
                value={form.password}
                placeholder={"Password"}
                onChange={hendeleOnchange}
            />

            <SButton
                loading={loading}
                disabled={loading}
                action={hendeleSubmit}
                variant="primary"
            >
                Submit
            </SButton>
        </Form>
    )
}

export default SForm