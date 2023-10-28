import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getData, postData } from '../../utils/fetch'
import { Container } from 'react-bootstrap'
import Form from './form'
import { setNotif } from '../../redux/notif/action'
import SAlert from '../../components/Alert'

const PageCreatePayment = () => {
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
            const res = await postData(`/cms/payment`, payload)

            if (res?.data?.data) {
                dispatch(
                    setNotif(
                        true,
                        'success',
                        `Berhasil Create Payment ${res.data.data.type}`
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

            {alert.status && <SAlert type={alert.type} message={alert.message} />}
            <Form
                form={form}
                isLoading={isLoading}
                hendeleChange={hendeleChange}
                hendeleSubmit={hendeleSubmit}
            />
        </Container>
    )
}

export default PageCreatePayment