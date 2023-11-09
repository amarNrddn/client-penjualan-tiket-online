import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import SBreadcrumbs from '../../components/Breadcrumbs'
import { accessOrganizers } from '../../consts/access'
import SButton from '../../components/Button'
import { useNavigate } from 'react-router-dom'

const PageOrganizers = () => {
    const navigate = useNavigate()
    const [access, setAccess] = useState({
        tambah: false
    })

    const checkAccess = () => {
        let { role } = localStorage.getItem('auth')
            ? JSON.parse(localStorage.getItem('auth'))
            : {}
        const access = { tambah: false }
        Object.keys(accessOrganizers).forEach(function (key, index) {
            if (accessOrganizers[key].indexOf(role) >= 0) {
                access[key] = true
            }
        })
        setAccess(access)
    }

    useEffect(() => {
        checkAccess()
    }, [])

    return (
        <Container>
            <SBreadcrumbs textSecound={'Organizers'} />
            <SButton
                className={'mb-3'}
                action={() => navigate('/organizers/create')}
            >
                Add Organizer
            </SButton>

            
        </Container>

    )
}

export default PageOrganizers