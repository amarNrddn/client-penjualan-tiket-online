import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PageParticipans from '../pages/participants'

const ParticipantsRoute = () => {
    return (
        <Routes>
            <Route path='/' element={<PageParticipans />} />
        </Routes>
    )
}

export default ParticipantsRoute