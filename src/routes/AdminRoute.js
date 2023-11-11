import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PageAdmin from '../pages/admin'

const AdminRoute = () => {
    return (
        <Routes>
            <Route path='/' element={<PageAdmin />} />
        </Routes>
    )
}

export default AdminRoute