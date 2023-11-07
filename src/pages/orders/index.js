import React, { useEffect } from 'react'
import { fetchOrders, setDate } from '../../redux/orders/action'
import { Col, Container, Row } from 'react-bootstrap'
import SBreadcrumbs from '../../components/Breadcrumbs'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { fetchEvents } from '../../redux/events/action'
import { formatDate } from '../../utils/formatDate'
import { useState } from 'react'
import SearchInput from '../../components/SSearch'
import DateRange from '../../components/inputDate'

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
        </Container>
    )
}

export default PageOrders