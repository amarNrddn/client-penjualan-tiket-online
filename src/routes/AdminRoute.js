import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PageAdmin from '../pages/admin'
import PageCreateAdmin from '../pages/admin/create'

const AdminRoute = () => {
    return (
        <Routes>
            <Route path='/' element={<PageAdmin />} />
            <Route path='/create' element={<PageCreateAdmin />} />
        </Routes>
    )
}

export default AdminRoute