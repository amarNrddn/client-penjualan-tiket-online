import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CategoriesPage from '../pages/categoies'
import CategoriesCreate from '../pages/categoies/create'
import CategoriesEdit from '../pages/categoies/edit'

const CategoriesRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<CategoriesPage />} />
            <Route path='/create' element={<CategoriesCreate />} />
            <Route path="/edit" element={<CategoriesEdit />} />
        </Routes>
    )
}

export default CategoriesRoute