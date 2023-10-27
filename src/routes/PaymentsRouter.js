import React from 'react'
import PagePayments from '../pages/payments'
import { Route, Routes } from 'react-router-dom'

const PaymentsRouter = () => {
  return (
    <Routes>
        <Route path='/'  element={<PagePayments/>}/>
    </Routes>
  )
}

export default PaymentsRouter