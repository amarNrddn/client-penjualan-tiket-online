import React from 'react'
import GuestOnlyRoute from '../components/GuestOnlyRoute'
import GuardRoute from '../components/GuardRoute'

import Sigin from '../pages/sigin'
import SNavbar from '../components/Navbar'
import HomeRoute from './HomeRoute'
import CategoriesRoute from './CategoriesRoute'
import TalentsRoute from './TalentsRoute'
import PaymentsRouter from './PaymentsRouter'
import EventsRoute from './EventsRoute'
import OrdersRouter from './OrdersRouter'
import ParticipantsRoute from './ParticipantsRoute'

import { Navigate, Route, Routes } from 'react-router-dom'
import OrganizersRoute from './OrganizersRoute'
import AdminRoute from './AdminRoute'

const AppRoutes = () => {
    return (
        <Routes>
            <Route
                path="sigin"
                element={
                    <GuestOnlyRoute>
                        <Sigin />
                    </GuestOnlyRoute>
                } />

            <Route
                path='/'
                element={
                    <>
                        <SNavbar />
                        <GuardRoute />
                    </>
                }
            >
                <Route path="dashboard/*" element={<HomeRoute />} />
                <Route path='/' element={<Navigate to="/dashboard" replace={true} />} />
                <Route path="categories/*" element={<CategoriesRoute />} />
                <Route path="talents/*" element={<TalentsRoute />} />
                <Route path='payments/*' element={<PaymentsRouter />} />
                <Route path='events/*' element={<EventsRoute />} />
                <Route path='orders/*' element={<OrdersRouter />} />
                <Route path='participants/*' element={<ParticipantsRoute />} />
                <Route path='organizers/*' element={<OrganizersRoute />} />
                <Route path='admin/*' element={<AdminRoute />}/>
            </Route>
        </Routes>
    )
}

export default AppRoutes