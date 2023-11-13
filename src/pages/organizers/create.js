import React, { useState } from 'react'
import SBreadcrumbs from '../../components/Breadcrumbs'
import Form from './form'
import SAlert from '../../components/Alert'

import { Container } from 'react-bootstrap'
import { postData } from '../../utils/fetch'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setNotif } from '../../redux/notif/action'

const PageCreateOrganizers = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({
    organizer: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  })
  const [alert, setAlert] = useState({
    status: false,
    type: '',
    message: ''
  })

  const hendleChange = (e) => {
    if (e.target.name === 'role') {
      setForm({ ...form, [e.target.name]: e })
    } else {
      setForm({ ...form, [e.target.name]: e.target.value })
    }
  }

  const hendleSubmit = async () => {
    setIsLoading(true)
    try {
      const payload = {
        organizer: form.organizer,
        name: form.name,
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword,
        role: form.role.value
      }

      const res = await postData('/cms/organizer', payload)

      if (res?.data?.data) {
        dispatch(
          setNotif(
            true,
            'success',
            `Berhasih Menambahkan Organizers ${res.data.data.name}`
          )
        )
        setIsLoading(false)
        navigate('/organizers')
      } else {
        setIsLoading(false)
        setAlert({
          ...alert,
          status: true,
          type: 'danger',
          message: res.response.data.msg
        })
      }
    } catch (error) {
    }
  }
  return (
    <Container>
      <SBreadcrumbs
        textSecound={'organizers'}
        urlSecound={'/organizers'}
        textThrid={'create'}
      />

      {alert.status && <SAlert type={alert.type} message={alert.message} />}

      <Form
        edit
        form={form}
        isLoading={isLoading}
        hendleChange={hendleChange}
        hendleSubmit={hendleSubmit}
      />
    </Container>
  )
}

export default PageCreateOrganizers