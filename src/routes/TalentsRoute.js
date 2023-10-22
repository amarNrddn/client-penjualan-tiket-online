import React from 'react'
import TalentsPage from '../pages/talents'

import { Route, Routes } from 'react-router-dom'

const TalentsRoute = () => {
  return (
    <Routes>
        <Route path='/' element={<TalentsPage/>} />
    </Routes>
  )
}

export default TalentsRoute