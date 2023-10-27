import React from 'react'
import PagePayments from '../pages/payments'
import PageEditPayments from '../pages/payments/edit'
import { Route, Routes } from 'react-router-dom'

const PaymentsRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<PagePayments />} />
            <Route path='/edit/:id' element={<PageEditPayments />} />
        </Routes>
    )
}

export default PaymentsRouter