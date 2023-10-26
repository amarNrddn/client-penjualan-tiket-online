import React, { useState } from 'react'
import Form from './form'
import { Container } from 'react-bootstrap'
import SBreadcrumbs from '../../components/Breadcrumbs'
import { postData } from '../../utils/fetch'
import { useNavigate } from 'react-router-dom'
import { setNotif } from '../../redux/notif/action'
import { useDispatch } from 'react-redux'
import SAlert from '../../components/Alert'

const TalentsCreate = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)

  const [form, setForm] = useState({
    name: '',
    role: '',
    file: '',
    avatar: ''
  })

  const [alert, setAlert] = useState({
    status: false,
    type: '',
    message: ''
  })

  const uploadImage = async (file) => {
    let formData = new FormData()
    formData.append('avatar', file)
    const res = await postData(`/cms/images`, formData, true)
    console.log(res)
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
          console.log(res)
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
    console.log('active')
    try {
      const payload = {
        image: form.file,
        name: form.name,
        role: form.fole,
      }
      const res = await postData('/cms/talents', payload)
      if (res?.data?.data) {
        dispatch(
          setNotif(
            true,
            'success',
            `Berhasil Menambahkan Talents ${res.data.data.name}`
          )
        )
        navigate('/talents')
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
    <>
      <Container>
        <SBreadcrumbs
          textSecound={'Talents'}
          urlSecound={'/talents'}
          textThrid={'create'}
        />

        {alert.status && <SAlert type={alert.type} message={alert.message} />}

        <Form
          form={form}
          hendeleChange={hendeleChange}
          hendeleSubmit={hendeleSubmit}
          isLoading={isLoading}
        />
      </Container>
    </>
  )
}

export default TalentsCreate