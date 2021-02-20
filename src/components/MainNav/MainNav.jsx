import React, { useState } from "react";
import { LinkContainer } from 'react-router-bootstrap';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './MainNav.scss';

function MainNav() {
    let [menuState, setMenuState] = useState(false);

    function handleOpen() {
        if (!menuState) {
            setMenuState(true);
        } else {
            setMenuState(false);
        }
    }

    return <>
        <nav className="main-nav px-2 py-1">
            <div className="nav-bar">
                <LinkContainer to="/"><h2 className="mb-0 mr-auto">ENDPOINT</h2></LinkContainer>
                <FontAwesomeIcon className="nav-button" onClick={handleOpen} icon={faBars} />
            </div>
            <Nav bsPrefix={menuState ? 'nav-links open' : 'nav-links'}>
                <LinkContainer to="/docs"><Nav.Link onClick={handleOpen}>DOCUMENTATION</Nav.Link></LinkContainer>
                <LinkContainer to="/users"><Nav.Link onClick={handleOpen}>USERS</Nav.Link></LinkContainer>
            </Nav>
            {/* </div> */}
        </nav>
    </>
}

export default MainNav;