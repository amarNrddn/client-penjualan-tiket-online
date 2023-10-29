import React, { useEffect, useState } from 'react'
import Form from './form'
import SBreadcrumbs from '../../components/Breadcrumbs'
import SAlert from '../../components/Alert'

import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { getData, postData, putData } from '../../utils/fetch'
import { useNavigate } from 'react-router-dom'
import { setNotif } from '../../redux/notif/action'
import { useDispatch } from 'react-redux'

const PageEditPayments = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [form, setForm] = useState({
        type: '',
        file: '',
        avatar: '',
        role: ''
    })

    const [alert, setAlert] = useState({
        status: false,
        type: '',
        message: ''
    })

    const fetchOnePayment = async () => {
        const res = await getData(`/cms/payment/${id}`)

        setForm({
            type: res.data.data.type,
            avatar: res.data.data.image.name,
            file: res.data.data.image._id,
            role: res.data.data.role,
        })
    }

    useEffect(() => {
        fetchOnePayment()
    }, [])

    const uploadImage = async (file) => {
        let formData = new FormData()
        formData.append('avatar', file)
        const res = await postData('/cms/images', formData, true)

        return res
    }

    const hendeleChange = async (e) => {
        if (e.target.name === 'avatar') {
            if (
                e?.target?.files[0]?.type === 'image/jpg' ||
                e?.target?.files[0]?.type === 'image/png' ||
                e?.target?.files[0]?.type === 'image/jpeg'
            ) {
                var size = parseFloat(e.target.files[0].size / 3145728).toFixed(2)

                if (size > 2) {
                    setAlert({
                        ...alert,
                        status: true,
                        type: 'danger',
                        message: 'Ukuruan file terlalu besar'
                    })
                    setForm({
                        ...form,
                        file: '',
                        [e.target.name]: ''
                    })
                } else {
                    const res = await uploadImage(e.target.files[0])
                    setForm({
                        ...form,
                        file: res.data.data._id,
                        [e.target.name]: res.data.data.name
                    })
                }
            } else {
                setAlert({
                    ...alert,
                    status: true,
                    type: 'danger',
                    message: 'type file harus jpg | png | jpeg'
                })

                setForm({
                    ...form,
                    file: '',
                    [e.target.name]: ''
                })
            }
        } else {
            setForm({ ...form, [e.target.name]: e.target.value })
        }
    }

    const hendeleSubmit = async () => {
        setIsLoading(true)
        try {
            const payload = {
                image: form.file,
                type: form.type,
                role: form.role
            }
            
            const res = await putData(`/cms/payment/${id}`, payload)

            if (res.data.data) {
                dispatch(
                    setNotif(
                        true,
                        'success',
                        `Berhasil update Talent ${res.data.data.type}`
                    )
                )
                navigate('/payments')
                setIsLoading(false)
            } else {
                setIsLoading(false)
                setAlert({
                    status: true,
                    type: 'danger',
                    message: res.response.data.msg
                })
            }
        } catch (error) {
            setIsLoading(false)
        }
    }

    return (
        <Container>
            <SBreadcrumbs
                textSecound={'payments'}
                urlSecound={'/payments'}
                textThrid={'Edit'}
            />

            {alert.status && <SAlert type={alert.type} message={alert.message} />}

            <Form
                edit
                form={form}
                isLoading={isLoading}
                hendeleChange={hendeleChange}
                hendeleSubmit={hendeleSubmit}
            />
        </Container>
    )
}

export default PageEditPayments