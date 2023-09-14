import React, {useState } from 'react'
import { Container } from 'react-bootstrap'
import Form from './form'
import SBreadcrumbs from '../../components/Breadcrumbs'
import SAlert from '../../components/Alert'
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
        type: '',
        message: ''
    })
    const [isLoading, setIsLoading] = useState(false)

    const hendeleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };


    const hendeleSubmit = async () => {
        setIsLoading(true)
        try {
            const res = await postData('/cms/categories', form)
            dispatch(
                setNotif(
                    true,
                    'success',
                    `Berhasil menambahkan kategori`
                )
            )
            console.log({res})
            navigate('/categories')
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false);
            setAlert({
                ...alert,
                status: true,
                message: error.response.data.msg,
                type: 'danger',
            });
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