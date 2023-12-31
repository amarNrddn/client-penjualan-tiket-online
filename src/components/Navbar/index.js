import React, { useEffect, useState } from 'react'
import NavLink from '../NavAccess'
import {
    accessCategories,
    accessTalents,
    accessEvents,
    accessOrders,
    accesPayments,
    accessParticipant,
    accessOrganizers,
    accessAdmin
} from '../../consts/access'

import { Container, Nav, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const SNavbar = () => {
    const navigate = useNavigate()
    const [role, setRole] = useState(null)

    useEffect(() => {
        const fetchData = () => {
            let { role } = localStorage.getItem('auth')
                ? JSON.parse(localStorage.getItem('auth'))
                : {}

            setRole(role)
        }

        fetchData()

    }, [])

    const hendeleLogout = () => {
        localStorage.clear()
        window.location.href = '/sigin'
    }

    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home">MARZKYY</Navbar.Brand>
                <Nav className="me-auto">
                    <NavLink
                        role={role}
                        roles={accessCategories.lihat}
                        action={() => navigate('/')}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        role={role}
                        roles={accessCategories.lihat}
                        action={() => navigate('/categories')}
                    >
                        Categories
                    </NavLink>
                    <NavLink
                        role={role}
                        roles={accessTalents.lihat}
                        action={() => navigate('/talents')}
                    >
                        Talents
                    </NavLink>
                    <NavLink
                        role={role}
                        roles={accesPayments.lihat}
                        action={() => navigate('/payments')}
                    >
                        Payments
                    </NavLink>
                    <NavLink
                        role={role}
                        roles={accessEvents.lihat}
                        action={() => navigate('/events')}
                    >
                        Events
                    </NavLink>
                    <NavLink
                        role={role}
                        roles={accessParticipant.lihat}
                        action={() => navigate('/participants')}
                    >
                        Participant
                    </NavLink>
                    <NavLink
                        role={role}
                        roles={accessOrders.lihat}
                        action={() => navigate('/orders')}
                    >
                        Orders
                    </NavLink>
                    <NavLink
                        role={role}
                        roles={accessOrganizers.lihat}
                        action={() => navigate('/organizers')}
                    >
                        Organizers
                    </NavLink>
                    <NavLink
                        role={role}
                        roles={accessAdmin.lihat}
                        action={() => navigate('/admin')}
                    >
                        Admin
                    </NavLink>
                </Nav>

                <Nav className='justify-content-end'>
                    <Nav.Link onClick={() => hendeleLogout()}>Logout</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default SNavbar    