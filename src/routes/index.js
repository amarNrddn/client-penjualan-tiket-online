import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import GuestOnlyRoute from '../components/GuestOnlyRoute'
import GuardRoute from '../components/GuardRoute'

import Sigin from '../pages/sigin'
import SNavbar from '../components/Navbar'
import HomeRoute from './HomeRoute'
import CategoriesRoute from './CategoriesRoute'


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
            </Route>
        </Routes>
    )
}

export default AppRoutes