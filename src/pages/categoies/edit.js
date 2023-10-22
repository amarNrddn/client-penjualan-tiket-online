import React, { useEffect, useState } from 'react'
import SAlert from '../../components/Alert'
import SBreadcrumbs from '../../components/Breadcrumbs'
import Form from './form'

import { getData, putData } from '../../utils/fetch'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setNotif } from '../../redux/notif/action'
import { useNavigate } from 'react-router-dom'

const CategoriesEdit = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const [alert, setAlert] = useState({
    status: false,
    message: '',
    type: ''
  })
  const [form, setForm] = useState({
    name: ""
  })

  const hendeleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const fetchDataCategory = async () => {
    const res = await getData(`/cms/categories/${id}`)

    setForm({ ...form, name: res.data.data.name })
  }

  useEffect(() => {
    fetchDataCategory()
  }, [])

  const hendeleSubmit = async () => {
    try {
        setIsLoading(true);
        const res = await putData(`/cms/categories/${id}`, form);
        if (res?.data?.data) {
            dispatch(
                setNotif(
                    true,
                    'success',
                    `berhasil Update kategori ${res.data.data.name}`
                )
            );
            navigate('/categories');
            setIsLoading(false);
            console.log(res.response.data.msg)
        } else {
            setIsLoading(false);
            setAlert({
                ...alert,
                status: true,
                type: 'danger',
                message: res.response.data.msg,
            });
            
        }
    } catch (error) {
        setIsLoading(false);
        setAlert({
          ...alert,
          status: true,
          type: 'danger',
          message: 'Harap priksa Kembali!!' ,
      });
    }
}

  return (
    <>
      <Container >
        <SBreadcrumbs
          textSecound={"Categories"}
          urlSecound={'/categories'}
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
    </>
  )
}

export default CategoriesEdit