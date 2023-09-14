import React from 'react'
import { Container } from 'react-bootstrap'
import SBreadcrumbs from '../../components/Breadcrumbs';

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