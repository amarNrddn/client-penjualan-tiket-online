import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useDispatch } from 'react-redux'
import { fetchTalents, setKeyword } from '../../redux/talents/action'
import SearchInput from '../../components/SSearch'
import { Container } from 'react-bootstrap'
import Table from '../../components/TableWithAction'
import SBreadcrumbs from '../../components/Breadcrumbs'
import { accessTalents } from '../../consts/access'

const TalentsPage = () => {
  const dispatch = useDispatch()
  const talents = useSelector((state) => state.talents)

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

  }
  return (
    <Container>
      <SBreadcrumbs textSecound={'Talents'} />
      <SearchInput
        query={talents.keyword}
        hendeleChange={(e) => dispatch(setKeyword(e.target.value))}
      />

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