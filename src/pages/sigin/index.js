import React from 'react'
import { useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import SAlert from '../../components/Alert';
import { useNavigate } from 'react-router-dom';
import SForm from './form';
import { postData } from '../../utils/fetch'
import { userLogin } from '../../redux/auth/action'
import { useDispatch } from 'react-redux';


const Sigin = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const [alert, setAlert] = useState({
        status: false,
        message: "",
        type: ''
    })

    const [loading, setLoading] = useState(false)

    const hendeleOnchange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const hendeleSubmit = async () => {
        setLoading(true)
        const res = await postData(`/cms/auth/sigin`, form)

        try {
            const response = res
           
            dispatch(userLogin(response.data.data.token, response.data.data.role))
            setLoading(false)
            navigate('/')
        } catch (error) {
            const failed = res.response.data.msg

            setLoading(false)
            if(failed) {
                setAlert({
                    status: true,
                    message: failed,
                    type: 'danger'
                })
            }
        }
    }

    return (
        <Container md="12">
            <div className="m-auto mt-5" style={{ width: "50%" }}>
                {alert.status && <SAlert type={alert.type} message={alert.message} />}
            </div>
            <Card style={{ width: "50%" }} className="m-auto mt-5">
                <Card.Body>
                    <Card.Title className='text-center'>Form Login</Card.Title>
                    <SForm
                        form={form}
                        hendeleOnchange={hendeleOnchange}
                        hendeleSubmit={hendeleSubmit}
                        loading={loading}
                    />
                </Card.Body>
            </Card>
        </Container>

    )
}

export default Sigin