import React from 'react'
import { Container } from 'react-bootstrap'
import SBreadcrumbs from '../../components/Breadcrumbs'

const PageAdmin = () => {
  return (
    <Container>
        <SBreadcrumbs textSecound={'Admin'}/>
    </Container>
  )
}

export default PageAdmin