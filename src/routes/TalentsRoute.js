import React from 'react'
import TalentsPage from '../pages/talents'
import TalentsCreate from '../pages/talents/create'
import TalentsEdit from '../pages/talents/edit'

import { Route, Routes } from 'react-router-dom'

const TalentsRoute = () => {
  return (
    <Routes>
      <Route path='/' element={<TalentsPage />} />
      <Route path='/create' element={<TalentsCreate />} />
      <Route path='/edit/:id' element={<TalentsEdit />} />
    </Routes>
  )
}

export default TalentsRoute