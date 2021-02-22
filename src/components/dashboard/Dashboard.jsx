import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import SearchField from '../common/search-field/SearchField';
import MyButton from "../common/button/Button";
import Users from '../users/Users';
import './dashboard.scss';

// * A container for the users table and possible other, it has the search field
function Dashboard() {
    // * newSearch goes to Users to make new requests while setNewSearch goes to SearchField to set the input
    let [newSearch, setNewSearch] = useState(false);

    return <Container fluid="md" className="px-0 dashboard">
        <Row className="mx-0">
            {/* setNewSearch("blank") tells users to make a get request of all the users*/}
            <h3 className="pr-1 mr-auto mb-2" onClick={() => { setNewSearch("blank") }}>Users</h3>
            <SearchField newSearch={setNewSearch} />
        </Row>
        <Users newSearch={newSearch} />
        <Row className="mx-0">
            <NavLink to="/users/new" className="ml-auto">
                <MyButton classes="mb-2" text="create" >{<FontAwesomeIcon className="ml-1" icon={faPlus} />}</MyButton>
            </NavLink>
        </Row>
    </Container>
}

export default Dashboard;