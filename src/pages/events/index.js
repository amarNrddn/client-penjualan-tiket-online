import React, { useEffect } from 'react'
import SBreadcrumbs from '../../components/Breadcrumbs'
import SButton from '../../components/Button'
import SearchInput from '../../components/SSearch'
import SelectBox from '../../components/SelectBox'
import Table from '../../components/TableWithAction'
import SAlert from '../../components/Alert'
import Swal from 'sweetalert2'

import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { fetchListCategories, fetchListTalents } from '../../redux/lists/action'
import { setCategory, setKeyword, setTalent } from '../../redux/events/action'
import { fetchEvents } from '../../redux/events/action'
import { useDispatch } from 'react-redux'
import { Col, Container, Row } from 'react-bootstrap'
import { deletData, putData } from '../../utils/fetch'
import { setNotif } from '../../redux/notif/action'

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
        await deletData(`/cms/events/${id}`)
        dispatch(
          setNotif(
            true,
            'success',
            'Berhasil Menghapus Events'
          )
        )
      }
      dispatch(fetchEvents())
    })
  }

  const hendleChangeStatus = async (id, status) => {
    Swal.fire({
      title: 'Apa kamu yakin?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Iya, Ubah Status',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const payload = {
          statusEvent: status === 'Published' ? 'Draft' : 'Published'
        }
        const res = await putData(`/cms/events/${id}/status`, payload)
        if (res.data.data) {
          dispatch(
            setNotif(
              true,
              'success',
              `Berhasil ubah setatus event ${res.data.data.title}`
            )
          )
        }
        dispatch(fetchEvents())
      }
    })
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

      {notif.status && <SAlert type={notif.type} message={notif.message} />}

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
        customAction={(id, status) => {
          return (
            <SButton
              size='sm'
              variant='primary'
              className='mx-2'
              action={() => hendleChangeStatus(id, status)}
            >
              Change Status
            </SButton>
          )
        }}
      />
    </Container>
  )
}

export default EventsPage