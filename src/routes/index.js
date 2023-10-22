import React from 'react'
import GuestOnlyRoute from '../components/GuestOnlyRoute'
import GuardRoute from '../components/GuardRoute'

import Sigin from '../pages/sigin'
import SNavbar from '../components/Navbar'
import HomeRoute from './HomeRoute'
import CategoriesRoute from './CategoriesRoute'
import TalentsRoute from './TalentsRoute'

import { Navigate, Route, Routes } from 'react-router-dom'

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
                <Route path='talent/*' element={<TalentsRoute/>} />
            </Route>
        </Routes>
    )
}

export default AppRoutes