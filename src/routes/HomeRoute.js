import React from 'react'
import Dashboard from '../pages/dashboard'

import { Routes, Route } from 'react-router-dom'

const HomeRoute = () => {
    return (
        <Routes>
            <Route path='/' element={<Dashboard />} />
        </Routes>
    )
}

export default HomeRoute