import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import SBreadcrumbs from '../../components/Breadcrumbs'
import { postData } from '../../utils/fetch'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setNotif } from '../../redux/notif/action'
import SAlert from '../../components/Alert'
import Form from './form'

const PageCreateAdmin = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: ''
    })
    const [alert, setAlert] = useState({
        status: false,
        type: '',
        message: ''
    })

    const hendleChange = (e) => {
        if (e.target.name === 'role') {
            setForm({ ...form, [e.target.name]: e })
        } else {
            setForm({ ...form, [e.target.name]: e.target.value })
        }
    }

    const hendleSubmit = async () => {
        setIsLoading(true)
        try {
            const payload = {
                name: form.name,
                email: form.email,
                password: form.password,
                confirmPassword: form.confirmPassword,
                role: form.role.value
            }

            const res = await postData('/cms/users', payload)

            if (res?.data?.data) {
                dispatch(
                    setNotif(
                        true,
                        'success',
                        `Berhasil menambahkan Admin ${res.data.data.name}`
                    )
                )
                setIsLoading(false)
                navigate('/admin')
            } else {
                setIsLoading(false)
                setAlert({
                    ...alert,
                    status: true,
                    type: 'danger',
                    message: res.response.data.msg
                })
            }
        } catch (error) {

        }
    }
    return (
        <Container>
            <SBreadcrumbs
                textSecound={'Admin'}
                urlSecound={'/admin'}
                textThrid={'create'}
            />
            {alert.status && <SAlert type={alert.type} message={alert.message} />}
            <Form
                form={form}
                hendleChange={hendleChange}
                hendleSubmit={hendleSubmit}
                isLoading={isLoading}
            />
        </Container>
    )
}

export default PageCreateAdmin