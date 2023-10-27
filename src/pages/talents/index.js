import React, { useEffect, useState } from 'react'
import SearchInput from '../../components/SSearch'
import Table from '../../components/TableWithAction'
import SBreadcrumbs from '../../components/Breadcrumbs'
import SButton from '../../components/Button'
import Swal from 'sweetalert2'
import SAlert from '../../components/Alert'

import { fetchTalents, setKeyword } from '../../redux/talents/action'
import { Container } from 'react-bootstrap'
import { accessTalents } from '../../consts/access'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deletData } from '../../utils/fetch'
import { setNotif } from '../../redux/notif/action'


const TalentsPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const talents = useSelector((state) => state.talents)
  const notif = useSelector((state) => state.notif)

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
    Object.keys(accessTalents).forEach(function (key, index) {
      if (accessTalents[key].indexOf(role) >= 0) {
        access[key] = true
      }
    })
    setAccess(access)
  }

  useEffect(() => {
    checkAccess()
  }, [])

  useEffect(() => {
    dispatch(fetchTalents())
  }, [dispatch, talents.keyword])

  const handleDelet = (id) => {
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
        await deletData(`/cms/talents/${id}`)
        dispatch(
          setNotif(
            true,
            'success',
            `Berhasil menghapus Talents `
          )
        )
        dispatch(fetchTalents())
      }
    })
  }

  return (
    <Container>
      <SBreadcrumbs textSecound={'Talents'} />

      {access.tambah && (
        <SButton
          className={'mb-3'}
          action={() => navigate('/talents/create')}
        >
          Add Talents
        </SButton>
      )}

      <SearchInput
        query={talents.keyword}
        hendeleChange={(e) => dispatch(setKeyword(e.target.value))}
      />

      {notif.status && (
        <SAlert type={notif.type} message={notif.message} />
      )}

      <Table
        status={talents.status}
        thead={['Nama', 'Role', 'Avatar', 'Aksi']}
        data={talents.data}
        tbody={['name', 'role', 'avatar']}
        editUrl={access.edit ? `/talents/edit` : null}
        deleteAction={access.hapus ? (id) => handleDelet(id) : null}
        withoutPagination
      />
    </Container>
  )
}

export default TalentsPage