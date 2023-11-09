import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PageOrganizers from '../pages/organizers'
import PageCreateOrganizers from '../pages/organizers/create'

const OrganizersRoute = () => {
    return (
        <Routes>
            <Route path='/' element={<PageOrganizers />} />
            <Route path='/create' element={<PageCreateOrganizers />} />
        </Routes>
    )
}

export default OrganizersRoute