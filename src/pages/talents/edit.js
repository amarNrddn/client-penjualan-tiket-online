import React, { useEffect, useState } from 'react'
import SBreadcrumbs from '../../components/Breadcrumbs'
import Form from './form'
import SAlert from '../../components/Alert'

import { Container } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { getData, putData, postData } from '../../utils/fetch'
import { useDispatch } from 'react-redux'
import { setNotif } from '../../redux/notif/action'

const TalentsEdit = () => {
  const navigate = useNavigate()
  const { id } = useParams()
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

  const fetchDataTalents = async () => {
    const res = await getData(`/cms/talents/${id}`)

    setForm({
      ...form.avatar,
      name: res.data.data.name,
      role: res.data.data.role,
      avatar: res.data.data.image.name,
      file: res.data.data.image._id
    })
  }

  useEffect(() => {
    fetchDataTalents()
  }, [])

  const uploadImage = async (file) => {
    let formData = new FormData()
    formData.append('avatar', file)
    const res = await postData(`/cms/images`, formData, true)
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
        name: form.name,
        role: form.role
      }
      const res = await putData(`/cms/talents/${id}`, payload)

      if (res.data.data) {
        dispatch(
          setNotif(
            true,
            'success',
            `Berhasil update Talent ${res.data.data.name}`
          )
        )
        navigate('/talents')
        setIsLoading(false)
      } else {
        setIsLoading(false)
        setAlert({
          status: true,
          type: 'danger',
          message: `res.response.data.msg`
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
          textThrid={'edit'}
        />

        {alert.status && <SAlert type={alert.type} message={alert.message} />}

        <Form
          edit
          form={form}
          hendeleChange={hendeleChange}
          hendeleSubmit={hendeleSubmit}
          isLoading={isLoading}
        />
      </Container>
    </>
  )
}

export default TalentsEdit