import React, { useState } from 'react'
import Form from './form'
import { Container } from 'react-bootstrap'
import SBreadcrumbs from '../../components/Breadcrumbs'
import {  useSelector } from 'react-redux/es/hooks/useSelector'

const PageCreateEvents = () => {
    const lists = useSelector((state) => state.lists)
    const [form, setForm] = useState({
        title: '',
        price: '',
        date: '',
        file: '',
        avatar: '',
        about: '',
        venueName: '',
        tagline: '',
        keyPoint: [''],
        tickets: [
            {
                type: '',
                status: '',
                price: '',
                stock: '',
            }
        ],
        category: '',
        talent: '',
        stock: ''
    })
    return (
        <Container>
            <SBreadcrumbs
                textSecound={'events'}
                urlSecound={'/events'}
                textThrid={'create'}
            />

            <Form 
                form={form}
                lists={lists}
            />

        </Container>
    )
}

export default PageCreateEvents