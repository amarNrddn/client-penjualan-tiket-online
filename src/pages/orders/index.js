import React, { useEffect, useState } from 'react'
import SBreadcrumbs from '../../components/Breadcrumbs'
import SearchInput from '../../components/SSearch'
import DateRange from '../../components/inputDate'
import Table from '../../components/TableWithAction'

import { fetchOrders, setDate, setPage } from '../../redux/orders/action'
import { Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { fetchEvents } from '../../redux/events/action'
import { formatDate } from '../../utils/formatDate'

const PageOrders = () => {
    const dispatch = useDispatch()
    const orders = useSelector((state) => state.orders)
    const [isShowed, setIsShowed] = useState(false)

    useEffect(() => {
        dispatch(fetchOrders())
    }, [dispatch, orders.page, orders.date])

    useEffect(() => {
        dispatch(fetchEvents())
    }, [dispatch])

    const displayDate = `${orders.date?.startDate ? formatDate(orders.date?.startDate) : ''
        }${orders.date?.endDate ? ' - ' + formatDate(orders.date.endDate) : ''}`;
        
    return (
        <Container>
            <SBreadcrumbs textSecound={'Orders'} />
            <Row>
                <Col
                    className='cursor-pointer position-relative '
                    onClick={() => setIsShowed(true)}
                >
                    <SearchInput query={displayDate} />
                    {isShowed ? (
                        <DateRange
                            date={orders.date}
                            setIsShowed={() => setIsShowed(!isShowed)}
                            onChangeDate={(ranges) => dispatch(setDate(ranges.selection))}
                        />
                    ) : (
                        " "
                    )}
                    <Col></Col>
                    <Col></Col>
                </Col>
            </Row>

            <Table
                status={orders.status}
                thead={[
                    'Nama',
                    'Email',
                    'Judul',
                    'Tanggal Event',
                    'Tanggal Order',
                    'Tempat',
                ]}
                data={orders.data}
                tbody={['name', 'email', 'title', 'date', 'orderDate', 'venueName']}
                pages={orders.pages}
                actionNotDisplay
                hendlePageClick={({ selected }) => dispatch(setPage(selected + 1))}
            />
        </Container>
    )
}

export default PageOrders