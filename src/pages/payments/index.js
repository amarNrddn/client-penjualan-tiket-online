import React, { useEffect, useState } from 'react'
import Table from '../../components/TableWithAction'
import SBreadcrumbs from '../../components/Breadcrumbs'
import SButton from '../../components/Button'

import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { fetchPayments } from '../../redux/payments/action'
import { useDispatch } from 'react-redux'
import { accesPayments } from '../../consts/access'

const PagePayments = () => {
    const dispatch = useDispatch()
    const payments = useSelector((state) => state.payments)
    const [access, setAccess] = useState({
        tambah: false,
        hapus: false,
        edit: false
    })

    const checkAccess = () => {
        let { role } = localStorage.getItem('auth')
            ? JSON.parse(localStorage.getItem('auth'))
            : {}
        const access = { tambah: false, hapus: false, edit: false }
        Object.keys(accesPayments).forEach(function (key, index) {
            if (accesPayments[key].indexOf(role) >= 0) {
                access[key] = true
            }
        })
        setAccess(access)
    }

    useEffect(() => {
        checkAccess()
    }, [])

    useEffect(() => {
        dispatch(fetchPayments())
    }, [dispatch])

    const handleDelet = async (id) => {

    }
    return (
        <Container>
            <SBreadcrumbs textSecound={'Payments'} />
            {access.tambah && (
                <SButton
                    className={'mb-3'}
                >
                    Add Payment
                </SButton>
            )}
            <Table
                status={payments.status}
                thead={['Type', 'Avatar', 'Aksi']}
                data={payments.data}
                tbody={['type', 'avatar']}
                editUrl={access.edit ? `/payments/edit` : null}
                deleteAction={access.hapus ? (id) => handleDelet(id) : null}
                withoutPagination
            />
        </Container>
    )
}

export default PagePayments