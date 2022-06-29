import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Container, Nav, Navbar, NavbarBrand } from 'reactstrap';

export function Navigation(props) {
    return (
        <Navbar color="light" light sticky="top" expand="md">
            <Container>
                <NavbarBrand tag={Link} to="/">🚐</NavbarBrand>
                <Nav className="mr-auto" navbar >
                    <ul className="navbar-nav ms-auto py-4 py-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link px-lg-3 py-3 py-lg-4" exact to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link px-lg-3 py-3 py-lg-4" exact to="/travel">Travel</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link px-lg-3 py-3 py-lg-4" exact to="/recipies">Recipies</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link px-lg-3 py-3 py-lg-4" exact to="/vanlife">Van Life</NavLink>
                        </li>
                    </ul>
                </Nav>
            </Container>
        </Navbar>
    );
}