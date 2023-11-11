import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import SBreadcrumbs from '../../components/Breadcrumbs'
import { useSelector } from 'react-redux'
import { fetchAdmin } from '../../redux/admin/action'
import { useDispatch } from 'react-redux'
import Table from '../../components/TableWithAction'
import SButton from '../../components/Button'
import { useNavigate } from 'react-router-dom'
import SAlert from '../../components/Alert'

const PageAdmin = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const admin = useSelector((state) => state.admin)
    const notif = useSelector((state) => state.notif)

    useEffect(() => {
        dispatch(fetchAdmin())
    }, [dispatch])
    return (
        <Container>
            <SBreadcrumbs  textSecound={'Admin'} />
            <SButton className='mt-3' action={() => navigate('/admin/create')}>
                Add Admin
            </SButton>

            {notif.status && <SAlert type={notif.typeNotif} message={notif.message} />}

            <Table
                status={admin.status}
                thead={['Nama', 'Email', 'Role']}
                data={admin.data}
                tbody={['name', 'email', 'role']}
            />
        </Container>
    )
}

export default PageAdmin