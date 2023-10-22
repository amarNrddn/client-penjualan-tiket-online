import React from 'react'
import SBreadcrumbs from '../../components/Breadcrumbs';

import { Container } from 'react-bootstrap'

const Dashboard = () => {
    return (
        <>
            <Container className="mt-3">
                <SBreadcrumbs />
                <h1>Dashboard</h1>
            </Container>
        </>
    )
}

export default Dashboard    