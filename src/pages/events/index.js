import React, { useEffect } from 'react'
import SBreadcrumbs from '../../components/Breadcrumbs'
import SButton from '../../components/Button'
import SearchInput from '../../components/SSearch'
import SelectBox from '../../components/SelectBox'
import Table from '../../components/TableWithAction'

import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { fetchListCategories, fetchListTalents } from '../../redux/lists/action'
import { setCategory, setKeyword, setTalent } from '../../redux/events/action'
import { fetchEvents } from '../../redux/events/action'
import { useDispatch } from 'react-redux'
import { Col, Container, Row } from 'react-bootstrap'

const EventsPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const notif = useSelector((state) => state.notif)
  const events = useSelector((state) => state.events)
  const lists = useSelector((state) => state.lists)

  useEffect(() => {
    dispatch(fetchEvents())
  }, [dispatch, events.keyword, events.category, events.talent])

  useEffect(() => {
    dispatch(fetchListCategories())
    dispatch(fetchListTalents())
  }, [dispatch])

  const hendleDelet = (id) => {

  }

  return (
    <Container>
      <SBreadcrumbs textSecound={'Events'} />
      <SButton
        className={'mb-3'}
        action={() => navigate('/events/create')}
      >
        Add Events
      </SButton>

      <Row>
        <Col>
          <SearchInput
            name='keyword'
            query={events.keyword}
            hendeleChange={(e) => dispatch(setKeyword(e.target.value))}
          />
        </Col>
        <Col>
          <SelectBox
            name='category'
            placeholder={'Masukan pencarian Kategori'}
            value={events.category}
            isClearable={true}
            options={lists.categories}
            hendleChange={(e) => dispatch(setCategory(e))}
          />
        </Col>
        <Col>
          <SelectBox
            name='talents'
            placeholder={'Masukan pencarian Talents'}
            value={events.talent}
            isClearable={true}
            options={lists.talents}
            hendleChange={(e) => dispatch(setTalent(e))}
          />
        </Col>
      </Row>

      <Table
        status={events.status}
        thead={[
          'Judul',
          'Tanggal',
          'Tempat',
          'Status',
          'Kategori',
          'Pembicara',
          'Aksi'
        ]}
        data={events.data}
        tbody={[
          'title',
          'date',
          'venueName',
          'statusEvent',
          'categoryName',
          'talentName'
        ]}
        editUrl={`/events/edit`}
        deleteAction={(id) => hendleDelet(id)}
      />
    </Container>
  )
}

export default EventsPage