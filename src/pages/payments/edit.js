import React, { useEffect, useState } from 'react'
import Form from './form'
import SBreadcrumbs from '../../components/Breadcrumbs'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { getData, putData } from '../../utils/fetch'

const PageEditPayments = () => {
    const { id } = useParams()

    const [form, setForm] = useState({
        type: '',
        file: '',
        avatar: ''
    })

    const fetchOnePayment = async () => {
        const res = await getData(`/cms/payment/${id}`)

        setForm({
            type: res.data.data.type,
            avatar: res.data.data.image.name,
            file: res.data.data.image._id,
        })
    }

    useEffect(() => {
        fetchOnePayment()
    }, [])

    return (
        <Container>
            <SBreadcrumbs
                textSecound={'payments'}
                urlSecound={'/payments'}
                textThrid={'Edit'}
            />
            <Form
                edit
                form={form}
            />
        </Container>
    )
}

export default PageEditPayments