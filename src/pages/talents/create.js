import React, { useState } from 'react'
import Form from './form'
import { Container } from 'react-bootstrap'
import SBreadcrumbs from '../../components/Breadcrumbs'

const TalentsCreate = () => {
  const [form, setForm] = useState({
    name: '',
    role: '',
    avatar: ''
  })

  const hendeleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  return (
    <>
      <Container>
        <SBreadcrumbs
          textSecound={'Talents'}
          urlSecound={'/talents'}
          textThrid={'create'}
        />

        <Form
          form={form}
          hendeleChange={hendeleChange}
        />
      </Container>
    </>
  )
}

export default TalentsCreate