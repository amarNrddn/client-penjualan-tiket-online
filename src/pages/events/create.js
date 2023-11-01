import React from 'react'
import Form from './form'
import { Container } from 'react-bootstrap'
import SBreadcrumbs from '../../components/Breadcrumbs'

const PageCreateEvents = () => {
    
    return (
        <Container>
            <SBreadcrumbs
                textSecound={'events'}
                urlSecound={'/events'}
                textThrid={'create'}
            />

        </Container>
    )
}

export default PageCreateEvents