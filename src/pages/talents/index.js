import React, { useEffect, useState } from 'react'
import SearchInput from '../../components/SSearch'
import Table from '../../components/TableWithAction'
import SBreadcrumbs from '../../components/Breadcrumbs'
import SButton from '../../components/Button'

import { fetchTalents, setKeyword } from '../../redux/talents/action'
import { Container } from 'react-bootstrap'
import { accessTalents } from '../../consts/access'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const TalentsPage = () => {
  const dispatch = useDispatch()
  const talents = useSelector((state) => state.talents)
  const navigate = useNavigate()

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