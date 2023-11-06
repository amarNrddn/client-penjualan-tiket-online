import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PageOrders from '../pages/orders'

const OrdersRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<PageOrders />} />
        </Routes>
    )
}

export default OrdersRouter