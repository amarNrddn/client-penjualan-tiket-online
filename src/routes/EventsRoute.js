import React from 'react'
import { Route, Routes } from 'react-router-dom'
import EventsPage from '../pages/events'
import PageCreateEvents from '../pages/events/create'

const EventsRoute = () => {
    return (
        <Routes>
            <Route path='/' element={<EventsPage />} />
            <Route path='/create' element={<PageCreateEvents/>} />
        </Routes>
    )
}

export default EventsRoute