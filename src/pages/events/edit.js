import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getData } from '../../utils/fetch'
import { Container } from 'react-bootstrap'
import SBreadcrumbs from '../../components/Breadcrumbs'
import Form from './form'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { fetchListCategories, fetchListTalents } from '../../redux/lists/action'

const PageEditEvents = () => {
    const { id } = useParams()
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
                statusTicketCategories: '',
                stock: '',
                price: '',
            },
        ],
        category: '',
        talent: '',
        statusEvent: ''
    })

    const fetchOneEvents = async () => {
        const res = await getData(`/cms/events/${id}`)
        console.log(res )
        console.log(res.data.data.statusEvent)
        setForm({
            ...form,
            title: res.data.data.title,
            date: moment(res.data.data.date).format('YYY-MM-DDTH:SS'),
            about: res.data.data.about,
            file: res.data.data.image._id,
            avatar: res.data.data.image.name,
            venueName: res.data.data.venueName,
            tagline: res.data.data.tagline,
            keyPoint: res.data.data.keyPoint,
            category: {
                label: res.data.data.category.name,
                target: {name: 'category', value: res?.data?.data?.category?._id},
                value: res.data.data.category._id
            },
            talent: {
                label: res?.data?.data?.talent?.name,
                target: {name: 'talent', value: res?.data?.data?.talent?._id},
                value: res?.data?.data?.talent?._id
            },
            tickets: res.data.data.tickets,
            statusEvent: res.data.data.statusEvent
            
        })
    }

    useEffect(() => {
        fetchOneEvents()
    }, [])

    useEffect(() => {
        fetchListCategories()
        fetchListTalents()
    }, [])
    return (
        <Container>
            <SBreadcrumbs
                textSecound={'events'}
                urlSecound={'/events'}
                textThrid={'edit'}
            />
                
            <Form
                edit
                form={form}
                lists={lists}
            />
        </Container>
    )
}

export default PageEditEvents