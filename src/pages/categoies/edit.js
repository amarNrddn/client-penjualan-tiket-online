import React, { useEffect, useState } from 'react'
import { getData } from '../../utils/fetch'
import SBreadcrumbs from '../../components/Breadcrumbs'
import { Container } from 'react-bootstrap'
import Form from './form'
import { useParams } from 'react-router-dom'

const CategoriesEdit = () => {
  const {id } = useParams()
  const [form, setForm] = useState({
    name: ""
  })

  const hendeleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const fetchDataCategory = async () => {
    const res = await getData(`/cms/categories/${id}`)
    
    setForm({...form, name: res.data.data.name})
  }

  useEffect(() => {
    fetchDataCategory()
  }, [])

  return (
    <>
      <Container >
        <SBreadcrumbs
          textSecound={"Categories"}
          urlSecound={'/categories'}
          textThrid={'Edit'}
        />

        <Form
          edit
          form={form}
        />
      </Container>
    </>
  )
}

export default CategoriesEdit