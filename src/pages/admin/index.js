import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import SBreadcrumbs from '../../components/Breadcrumbs'
import { useSelector } from 'react-redux'
import { fetchAdmin } from '../../redux/admin/action'
import { useDispatch } from 'react-redux'

const PageAdmin = () => {
    const dispatch = useDispatch()
    const admin = useSelector((state) => state.admin)

    console.log(admin)

    useEffect(() => {
        dispatch(fetchAdmin())
    }, [dispatch])
  return (
    <Container>
        <SBreadcrumbs textSecound={'Admin'}/>


    </Container>
  )
}

export default PageAdmin