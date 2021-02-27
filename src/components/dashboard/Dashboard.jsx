import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import SearchField from '../common/search-field/SearchField';
import MyButton from "../common/button/Button";
import Users from '../users/Users';
import MyPagination from '../pagination/Pagination';
import './dashboard.scss';

// * A container for the users table and possible other, it has the search field
function Dashboard() {
    // * newSearch goes to Users to make new requests while setNewSearch goes to SearchField to set the input
    let [newSearch, setNewSearch] = useState(false);
    // * If false doesn't show the pagination, otherwise will contain a number that defines the amount of 'extra pages'
    let [showPagination, setShowPagination] = useState(false);
    // * Stores the number of pages in case of pagination
    let [pageNumber, setPageNumber] = useState(1);

    return <>
        <Helmet><title>Users - Endpoint</title></Helmet>
        <Container fluid="md" className="dashboard">
            <Row className="mx-0">
                {/* setNewSearch("blank") tells users to make a get request of all the users*/}
                <h3 className="pr-1 mr-auto mb-2" onClick={() => { setNewSearch("blank") }}>Users</h3>
                <SearchField newSearch={setNewSearch} />
            </Row>
            {/* Recives page number to know which users to show and setShowPagination get set in case of more than 8 users */}
            <Users newSearch={newSearch} pageNumber={pageNumber} showPagination={setShowPagination} />
            <Row className="mx-0">
                {/* options is for define the amount of options of other pages to show, setPageNumber to define which 'page' is selected */}
                {showPagination && <MyPagination options={showPagination} setPage={setPageNumber} />}
                <NavLink to="/users/new" className="ml-auto">
                    <MyButton classes="mb-2" text="create" >{<FontAwesomeIcon className="ml-1" icon={faPlus} />}</MyButton>
                </NavLink>
            </Row>
        </Container>
    </>
};

export default Dashboard;