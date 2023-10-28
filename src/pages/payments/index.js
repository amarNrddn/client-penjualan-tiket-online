import React, { useEffect, useState } from 'react'
import Table from '../../components/TableWithAction'
import SBreadcrumbs from '../../components/Breadcrumbs'
import SButton from '../../components/Button'
import SAlert from '../../components/Alert'
import Swal from 'sweetalert2'

import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { fetchPayments } from '../../redux/payments/action'
import { useDispatch } from 'react-redux'
import { accesPayments } from '../../consts/access'
import { useNavigate } from 'react-router-dom'
import { deletData } from '../../utils/fetch'
import { setNotif } from '../../redux/notif/action'

const PagePayments = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const notif = useSelector((state) => state.notif)
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
        Swal.fire({
            title: 'Apa kamu Yakin?',
            text: 'Anda tidak akan dapat mengembalikan ini!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Iya, Hapus',
            cancelButtonText: 'Batal',
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deletData(`/cms/payment/${id}`)
                dispatch(
                    setNotif(
                        true,
                        'success',
                        `Berhasil menghapus Talents `
                    )
                )
                dispatch(fetchPayments())
            }
        })
    }
    return (
        <Container>
            <SBreadcrumbs textSecound={'Payments'} />
            {access.tambah && (
                <SButton
                    className={'mb-3'}
                    action={() => navigate('/payments/create')}
                >
                    Add Payment
                </SButton>
            )}

            {notif.status && <SAlert type={notif.type} message={notif.message} />}
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