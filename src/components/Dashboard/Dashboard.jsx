import React, { useEffect, useState } from 'react';
import SearchField from '../SearchField/SearchField';
import MyButton from "../Button/Button";
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faCaretDown, faAngleLeft, faAngleRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useMediaQuery } from 'react-responsive';
import { NavLink } from 'react-router-dom';
import './Dashboard.scss';

function Dashboard() {
    const [users, setUsers] = useState([]);

    useEffect(async () => {
        const response = await axios.get('https://jh-endpoint-api.herokuapp.com/users');
        setUsers(response.data);
    }, []);

    const isSmallScreen = useMediaQuery({ query: '(min-width: 576px)' });
    const isMediumScreen = useMediaQuery({ query: '(min-width: 768px)' });
    const isLargeScreen = useMediaQuery({ query: '(min-width: 992px)' });

    function handleCreate() {
        console.log('hola aqui');
    }

    return <Container fluid="md" className="px-0">
        <Row className="mx-0">
            <h3 className="pr-1 mr-auto mb-2">Users</h3>
            <SearchField setData={setUsers} />
        </Row>
        <Table borderless >
            <thead className='table-styles'>
                <tr>
                    <th>#</th>
                    <th>Username<FontAwesomeIcon className='ml-1' icon={faCaretDown} /></th>
                    {isSmallScreen && <th>First Name<FontAwesomeIcon className='ml-1' icon={faCaretDown} /></th>}
                    {isMediumScreen && <th>Last Name<FontAwesomeIcon className='ml-1' icon={faCaretDown} /></th>}
                    {isLargeScreen && <><th>Age<FontAwesomeIcon className='ml-1' icon={faCaretDown} /></th>
                        <th>Email<FontAwesomeIcon className='ml-1' icon={faCaretDown} /></th></>}
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody className='table-styles table-body'>
                {users.length > 1 ?
                    users.map((user, index) => {
                        return <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{user.username}</td>
                            {isSmallScreen && <td>{user.firstName}</td>}
                            {isMediumScreen && <td>{user.lastName}</td>}
                            {isLargeScreen && <><td>{user.age}</td><td>{user.mail}</td></>}
                            <td>
                                <NavLink to={`/users/${user.username}`}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </NavLink>
                            </td>
                        </tr>
                    })
                    :
                    <tr>
                        <td>1</td>
                        <td>{users.username}</td>
                        {isSmallScreen && <td>{users.firstName}</td>}
                        {isMediumScreen && <td>{users.lastName}</td>}
                        {isLargeScreen && <><td>{users.age}</td><td>{users.mail}</td></>}
                        <td>
                            <NavLink to={`/users/${users.username}`}>
                                <FontAwesomeIcon icon={faEdit} />
                            </NavLink>
                        </td>
                    </tr>
                }
            </tbody>
        </Table>
        <Row className="mx-0">
            <Pagination className="mr-auto">
                <Pagination.Item>{<FontAwesomeIcon icon={faAngleLeft} />}</Pagination.Item>
                <Pagination.Item active>{1}</Pagination.Item>
                <Pagination.Item>{2}</Pagination.Item>
                <Pagination.Item>{3}</Pagination.Item>
                <Pagination.Item>{<FontAwesomeIcon icon={faAngleRight} />}</Pagination.Item>
            </Pagination>
            <MyButton classes="mb-2" text="create" functionality={handleCreate} >{<FontAwesomeIcon className="ml-1" icon={faPlus} />}</MyButton>
        </Row>
    </Container>
}

export default Dashboard;