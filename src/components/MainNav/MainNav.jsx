import React, { useState } from "react";
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './MainNav.scss';

function MainNav() {
    return <>
        <Navbar bg="primary" variant="dark" expand="sm">
            <LinkContainer to="/">
                <Navbar.Brand href="/">ENDPOINT</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle className="navBtn" aria-controls="basic-navbar-nav" children={<FontAwesomeIcon icon={faBars} />} />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mx-auto">
                    <LinkContainer to="/docs" >
                        <Nav.Link href="/docs">DOCUMENTATION</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/users" >
                        <Nav.Link href="/users">USERS</Nav.Link>
                    </LinkContainer>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </>;
}

export default MainNav;