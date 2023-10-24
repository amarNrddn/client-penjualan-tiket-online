import React, { useEffect } from 'react'
import {  useSelector } from 'react-redux/es/hooks/useSelector'
import { useDispatch } from 'react-redux'
import { fetchTalents } from '../../redux/talents/action'
import SearchInput from '../../components/Search'
import { Container, Table } from 'react-bootstrap'
import SBreadcrumbs from '../../components/Breadcrumbs'

const TalentsPage = () => {
  const dispatch = useDispatch()
  const talents = useSelector((state) => state.talents)

  useEffect(() => {
    dispatch(fetchTalents())
  }, [dispatch])
  return (
      <Container>
        <SBreadcrumbs textSecound={'Talents'}/>
        <SearchInput />

        <Table 
          status={talents.status}
        />
      </Container>
  )
}

export default TalentsPage