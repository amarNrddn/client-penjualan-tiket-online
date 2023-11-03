import React from 'react'
import { Route, Routes } from 'react-router-dom'
import EventsPage from '../pages/events'
import PageCreateEvents from '../pages/events/create'
import PageEditEvents from '../pages/events/edit'

const EventsRoute = () => {
    return (
        <Routes>
            <Route path='/' element={<EventsPage />} />
            <Route path='/create' element={<PageCreateEvents/>} />
            <Route path='/edit/id' element={<PageEditEvents/>}/>
        </Routes>
    )
}

export default EventsRoute