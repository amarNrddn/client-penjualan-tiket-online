import React from 'react'
import { Route, Routes } from 'react-router-dom'
import EventsPage from '../pages/events'

const EventsRoute = () => {
    return (
        <Routes>
            <Route path='/' element={<EventsPage />} />
        </Routes>
    )
}

export default EventsRoute