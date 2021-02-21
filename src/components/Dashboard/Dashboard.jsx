import React, { useState } from 'react';
import SearchField from '../SearchField/SearchField';
import MyButton from "../Button/Button";
import { faAngleLeft, faAngleRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Pagination from 'react-bootstrap/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Dashboard.scss';
import Users from '../Users/Users';
import { NavLink } from 'react-router-dom';

function Dashboard() {

    let [newSearch, setNewSearch] = useState(false);

    return <Container fluid="md" className="px-0 dashboard">
        <Row className="mx-0">
            <h3 className="pr-1 mr-auto mb-2" onClick={() => { setNewSearch("blank") }}>Users</h3>
            <SearchField newSearch={setNewSearch} />
        </Row>
        <Users newSearch={newSearch} />
        <Row className="mx-0">
            <Pagination className="mr-auto">
                <Pagination.Item>{<FontAwesomeIcon icon={faAngleLeft} />}</Pagination.Item>
                <Pagination.Item active>{1}</Pagination.Item>
                <Pagination.Item>{2}</Pagination.Item>
                <Pagination.Item>{3}</Pagination.Item>
                <Pagination.Item>{<FontAwesomeIcon icon={faAngleRight} />}</Pagination.Item>
            </Pagination>
            <NavLink to="/users/new">
                <MyButton classes="mb-2" text="create" >{<FontAwesomeIcon className="ml-1" icon={faPlus} />}</MyButton>
            </NavLink>
        </Row>
    </Container>
}

export default Dashboard;