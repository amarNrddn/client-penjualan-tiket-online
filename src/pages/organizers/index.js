import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import SBreadcrumbs from '../../components/Breadcrumbs'
import { accessOrganizers } from '../../consts/access'
import SButton from '../../components/Button'
import { useNavigate } from 'react-router-dom'
import { fetchingOrganizers } from '../../redux/organizers/action'
import { useDispatch, useSelector } from 'react-redux'
import Table from '../../components/TableWithAction'
import SAlert from '../../components/Alert'

const PageOrganizers = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const notif = useSelector((state) => state.notif)
    const users = useSelector((state) => state.organizers)

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

    useEffect(() => {
        dispatch(fetchingOrganizers())
    }, [dispatch])

    return (
        <Container>
            <SBreadcrumbs textSecound={'Organizers'} />
            <SButton
                className={'mb-3'}
                action={() => navigate('/organizers/create')}
            >
                Add Organizer
            </SButton>

            {notif.status && <SAlert type={notif.typeNotif} message={notif.message} />}
            
            <Table
                status={users.status}
                thead={['Nama', 'Email', 'Role']}
                data={users.data}
                tbody={['name', 'email', 'role']}
            />
        </Container>

    )
}

export default PageOrganizers