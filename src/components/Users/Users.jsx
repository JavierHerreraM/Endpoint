import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';
import './users.scss';

function Users(props) {
    const { newSearch } = props;
    const isSmallScreen = useMediaQuery({ query: '(min-width: 576px)' });
    const isMediumScreen = useMediaQuery({ query: '(min-width: 768px)' });
    const isLargeScreen = useMediaQuery({ query: '(min-width: 992px)' });

    const [users, setUsers] = useState([]);

    useEffect(async () => {
        const response = await axios.get('https://jh-endpoint-api.herokuapp.com/users');
        setUsers(response.data);
    }, []);

    useEffect(async () => {
        if (newSearch !== false) {
            let response;
            if (newSearch === "blank") {
                response = await axios.get(`https://jh-endpoint-api.herokuapp.com/users`);
            } else {
                response = await axios.get(`https://jh-endpoint-api.herokuapp.com/users/${newSearch}`);
            }
            setUsers(response.data);
        }
    }, [newSearch]);

    return <>
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
    </>;
}

export default Users;