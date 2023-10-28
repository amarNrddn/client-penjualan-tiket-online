import React from 'react'
import PagePayments from '../pages/payments'
import PageEditPayments from '../pages/payments/edit'
import PageCreatePayment from '../pages/payments/create'
import { Route, Routes } from 'react-router-dom'

const PaymentsRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<PagePayments />} />
            <Route path='/create' element={<PageCreatePayment/>} />
            <Route path='/edit/:id' element={<PageEditPayments />} />
        </Routes>
    )
}

export default PaymentsRouter