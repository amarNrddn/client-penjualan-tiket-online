import React, { useState } from 'react'
import SBreadcrumbs from '../../components/Breadcrumbs'
import Form from './form'
import SAlert from '../../components/Alert'

import { Container } from 'react-bootstrap'
import { postData } from '../../utils/fetch'
import { useDispatch } from 'react-redux'
import { setNotif } from '../../redux/notif/action'
import { useNavigate } from 'react-router-dom'

const CategoriesCreate = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        name: ''
    })
    const [alert, setAlert] = useState({
        status: false,
        message: "",
        type: ""
    })
    const [isLoading, setIsLoading] = useState(false)

    const hendeleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };


    const hendeleSubmit = async () => {
        try {
            setIsLoading(true);
            const res = await postData('/cms/categories', form);
            if (res?.data?.data) {
                dispatch(
                    setNotif(
                        true,
                        'success',
                        `berhasil tambah kategori ${res.data.data.name}`
                    )
                );
                navigate('/categories');
                setIsLoading(false);
            } else {
                setIsLoading(false);
                setAlert({
                    ...alert,
                    status: true,
                    type: 'danger',
                    message: res.response.data.msg,
                });
            }
        } catch (error) {
            setIsLoading(false);
        }
    }

    return (
        <>
            <Container>
                <SBreadcrumbs
                    textSecound={'Categories'}
                    urlSecound={'/categories'}
                    textThrid={'Create'}
                />
                {alert.status && <SAlert type={alert.type} message={alert.message} />}
                <Form
                    form={form}
                    isLoading={isLoading}
                    hendeleChange={hendeleChange}
                    hendeleSubmit={hendeleSubmit}
                />
            </Container>
        </>
    )
}

export default CategoriesCreate