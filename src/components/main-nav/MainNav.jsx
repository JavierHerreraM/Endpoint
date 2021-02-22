import React, { useState } from "react";
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './mainNav.scss';

// * Its the page navigation component
function MainNav() {
    // * menuState controlls if the options show in smaller screens
    let [menuState, setMenuState] = useState(false);

    const handleOpen = () => setMenuState(!menuState);

    return <nav className="main-nav px-2 py-1">
        <div className="nav-bar">
            <LinkContainer to="/"><h2 className="mb-0 mr-auto">ENDPOINT</h2></LinkContainer>
            <FontAwesomeIcon className="nav-button" onClick={handleOpen} icon={faBars} />
        </div>
        <Nav bsPrefix={menuState ? 'nav-links open' : 'nav-links'}>
            <LinkContainer to="/docs"><Nav.Link onClick={handleOpen}>DOCUMENTATION</Nav.Link></LinkContainer>
            <LinkContainer to="/users"><Nav.Link onClick={handleOpen}>USERS</Nav.Link></LinkContainer>
        </Nav>
    </nav>;
}

export default MainNav;