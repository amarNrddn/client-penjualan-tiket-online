import React, { useEffect, useState } from 'react'
import Form from './form'
import SBreadcrumbs from '../../components/Breadcrumbs'
import SAlert from '../../components/Alert'

import { Container } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { postData } from '../../utils/fetch'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { fetchListCategories, fetchListTalents } from '../../redux/lists/action'
import { setNotif } from '../../redux/notif/action'
import { useNavigate } from 'react-router-dom'

const PageCreateEvents = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const lists = useSelector((state) => state.lists)
    const [isLoading, setIsLoading] = useState(false)
    const [alert, setAlert] = useState({
        status: false,
        type: '',
        message: ''
    })
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
    })

    useEffect(() => {
        dispatch(fetchListCategories())
        dispatch(fetchListTalents())
    }, [dispatch])

    const uploadImage = async (file) => {
        let formData = new FormData()
        formData.append('avatar', file)
        const res = await postData('/cms/images', formData, true)
        return res
    }

    const hendleChange = async (e) => {
        if (e.target.name === 'avatar') {
            if (
                e?.target?.files[0]?.type === 'image/jpg' ||
                e?.target?.files[0]?.type === 'image/png' ||
                e?.target?.files[0]?.type === 'image/jpeg'
            ) {
                var size = parseFloat(e.target.files[0].size / 3145728).toFixed(2);

                if (size > 2) {
                    setAlert({
                        ...alert,
                        status: true,
                        type: 'danger',
                        message: 'Please select image size less than 3 MB',
                    });
                    setForm({
                        ...form,
                        file: '',
                        [e.target.name]: '',
                    });
                } else {
                    const res = await uploadImage(e.target.files[0]);

                    setForm({
                        ...form,
                        file: res.data.data._id,
                        [e.target.name]: res.data.data.name,
                    });
                }
            } else {
                setAlert({
                    ...alert,
                    status: true,
                    type: 'danger',
                    message: 'type image png | jpg | jpeg',
                });
                setForm({
                    ...form,
                    file: '',
                    [e.target.name]: '',
                });
            }
        } else if (e.target.name === 'category' || e.target.name === 'talent') {
            setForm({ ...form, [e.target.name]: e });
        } else {
            setForm({ ...form, [e.target.name]: e.target.value });
        }
    }

    const hendleSubmit = async () => {
        setIsLoading(true)
        try {
            const _temp = [];
            form.tickets.forEach((tic) => {
                _temp.push({
                    type: tic.type,
                    statusTicketCategories: tic.statusTicketCategories.value,
                    stock: tic.stock,
                    price: tic.price,
                });
            });

            const payload = {
                date: form.date,
                image: form.file,
                title: form.title,
                price: form.price,
                about: form.about,
                venueName: form.venueName,
                tagline: form.tagline,
                keyPoint: form.keyPoint,
                category: form.category.value,
                talent: form.talent.value,
                status: form.status,
                tickets: _temp,
            }

            const res = await postData('/cms/events', payload)

            if (res.data.data) {
                dispatch(
                    setNotif(
                        true,
                        'success',
                        `Berhasil menambahkan events ${res.data.data.title}`
                    )
                )
                navigate('/events')
                setIsLoading(false)
            } else {
                setIsLoading(false)
                setAlert(
                    SAlert({
                        ...alert,
                        status: true,
                        type: 'danger',
                        message: res.data.response.msg
                    })
                )
            }
        } catch (error) {

        }
    }

    const hendleChangeKeyPoint = (e, i) => {
        let _temp = [...form.keyPoint]

        _temp[i] = e.target.value

        setForm({ ...form, keyPoint: _temp })
    }

    const hendlePlusKeyPoint = () => {
        let _temp = [...form.keyPoint]
        _temp.push('')

        setForm({ ...form, keyPoint: _temp })
    }

    const hendleMinusKeyPoint = (index) => {
        let _temp = [...form.keyPoint]
        let removeIndex = _temp
            .map((_, i) => {
                return i
            })
            .indexOf(index)

        _temp.splice(removeIndex, 1)

        setForm({ ...form, keyPoint: _temp })
    }

    const hendleChangeTicket = (e, i) => {
        let _temp = [...form.tickets]
        _temp[i][e.target.name] = e.target.value

        setForm({ ...form, tickets: _temp })
    }

    const hendlePlusTicket = () => {
        let _temp = [...form.tickets]
        _temp.push({
            type: '',
            statusTicketCategories: '',
            price: '',
            stock: ''
        })

        setForm({ ...form, tickets: _temp })
    }

    const hendleMinusTicket = (index) => {
        let _temp = [...form.tickets]
        let removeIndex = _temp
        _temp.map((_, i) => {
            return i
        })
            .indexOf(index)

        _temp.splice(removeIndex, 1)

        setForm({ ...form, tickets: _temp })
    }

    return (
        <Container>
            <SBreadcrumbs
                textSecound={'events'}
                urlSecound={'/events'}
                textThrid={'create'}
            />
            {alert.status && <SAlert type={alert.type} message={alert.message} />}
            
            <Form
                form={form}
                lists={lists}
                isLoading={isLoading}
                hendleChange={hendleChange}
                hendleSubmit={hendleSubmit}
                hendleChangeKeyPoint={hendleChangeKeyPoint}
                hendlePlusKeyPoint={hendlePlusKeyPoint}
                hendleMinusKeyPoint={hendleMinusKeyPoint}
                hendleChangeTicket={hendleChangeTicket}
                hendlePlusTicket={hendlePlusTicket}
                hendleMinusTicket={hendleMinusTicket}
            />

        </Container>
    )
}

export default PageCreateEvents