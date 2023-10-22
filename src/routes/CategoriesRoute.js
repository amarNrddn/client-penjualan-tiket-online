import React from 'react'
import CategoriesPage from '../pages/categoies'
import CategoriesCreate from '../pages/categoies/create'
import CategoriesEdit from '../pages/categoies/edit'

import { Route, Routes } from 'react-router-dom'

const CategoriesRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<CategoriesPage />} />
            <Route path='/create' element={<CategoriesCreate />} />
            <Route path="/edit/:id" element={<CategoriesEdit />} />
        </Routes>
    )
}

export default CategoriesRoute