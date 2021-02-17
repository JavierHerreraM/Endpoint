import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function MainNav() {
    return <>
        <Navbar bg="primary" variant="dark" expand="sm">
            <Navbar.Brand href="#home">ENDPOINT</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mx-auto">
                    <Nav.Link href="#home">DOCUMENTATION</Nav.Link>
                    <Nav.Link href="#link">USERS</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </>;
}

export default MainNav;