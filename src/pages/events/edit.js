import React, { useEffect, useState } from 'react'
import SBreadcrumbs from '../../components/Breadcrumbs'
import Form from './form'
import moment from 'moment'

import { useParams } from 'react-router-dom'
import { getData, postData } from '../../utils/fetch'
import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { fetchListCategories, fetchListTalents } from '../../redux/lists/action'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { putData } from '../../utils/fetch'
import { setNotif } from '../../redux/notif/action'

const PageEditEvents = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
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
    const [alert, setAlert] = useState({
        status: false,
        type: '',
        message: ''
    })
    const [isLoading, setIsLoading] = useState(false)


    const fetchOneEvents = async () => {
        const res = await getData(`/cms/events/${id}`)
        const _temp = [];

        res.data.data.tickets.forEach((tic) => {
            _temp.push({
                type: tic.type,
                price: tic.price,
                stock: tic.stock,
                statusTicketCategories: {
                    label: tic.statusTicketCategories ? 'aktif' : 'tidak aktif',
                    value: tic.statusTicketCategories,
                },
            });
        });

        setForm({
            ...form,
            title: res.data.data.title,
            date: moment(res.data.data.date).format('YYYY-MM-DDTHH:SS'),
            about: res.data.data.about,
            file: res.data.data.image._id,
            avatar: res.data.data.image.name,
            venueName: res.data.data.venueName,
            tagline: res.data.data.tagline,
            keyPoint: res.data.data.keyPoint,
            category: {
                label: res.data.data.category.name,
                target: { name: 'category', value: res?.data?.data?.category?._id },
                value: res.data.data.category._id
            },
            talent: {
                label: res?.data?.data?.talent?.name,
                target: { name: 'talent', value: res?.data?.data?.talent?._id },
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

            const res = await putData(`/cms/events/${id}`, payload)

            if (res.data.data) {
                dispatch(
                    setNotif(
                        true,
                        'success',
                        `Berhasil mengubah Events ${res.data.data.title}`
                    )
                )
                navigate('/events')
                setIsLoading(false)
            } else {
                setIsLoading(false)
                setAlert({
                    ...alert,
                    status: true,
                    type: 'danger',
                    message: res.data.response.msg
                })
            }
        } catch (error) {

        }
    }

    const hendleChangeKeyPoint = (e, i) => {
        let _temp = [...form.keyPoint];

        _temp[i] = e.target.value;

        setForm({ ...form, keyPoint: _temp });
    };

    const hendlePlusKeyPoint = () => {
        let _temp = [...form.keyPoint];
        _temp.push('');

        setForm({ ...form, keyPoint: _temp });
    };

    const hendleMinusKeyPoint = (index) => {
        let _temp = [...form.keyPoint];
        let removeIndex = _temp
            .map(function (_, i) {
                return i;
            })
            .indexOf(index);

        _temp.splice(removeIndex, 1);
        setForm({ ...form, keyPoint: _temp });
    };

    const hendlePlusTicket = () => {
        let _temp = [...form.tickets];
        _temp.push({
            type: '',
            statusTicketCategories: '',
            stock: '',
            price: '',
        });

        setForm({ ...form, tickets: _temp });
    };
    const hendleMinusTicket = (index) => {
        let _temp = [...form.tickets];
        let removeIndex = _temp
            .map(function (_, i) {
                return i;
            })
            .indexOf(index);

        _temp.splice(removeIndex, 1);
        setForm({ ...form, tickets: _temp });
    };

    const hendleChangeTicket = (e, i) => {
        let _temp = [...form.tickets];

        if (e.target.name === 'statusTicketCategories') {
            _temp[i][e.target.name] = e;
        } else {
            _temp[i][e.target.name] = e.target.value;
        }

        setForm({ ...form, tickets: _temp });
    };

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
                isLoading={isLoading}
                hendleChange={hendleChange}
                hendleChangeKeyPoint={hendleChangeKeyPoint}
                hendlePlusKeyPoint={hendlePlusKeyPoint}
                hendleMinusKeyPoint={hendleMinusKeyPoint}
                hendleChangeTicket={hendleChangeTicket}
                hendlePlusTicket={hendlePlusTicket}
                hendleMinusTicket={hendleMinusTicket}
                hendleSubmit={hendleSubmit}
            />
        </Container>
    )
}

export default PageEditEvents