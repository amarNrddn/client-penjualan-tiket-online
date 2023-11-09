import React from 'react'
import { Container } from 'react-bootstrap'
import SBreadcrumbs from '../../components/Breadcrumbs'

const PageParticipans = () => {
  return (
    <Container>
        <SBreadcrumbs textSecound={'Participants'} />
        <div className="">Participants Comming Soon</div>
    </Container>
  )
}

export default PageParticipans