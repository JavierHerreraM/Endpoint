import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import './users.scss';

// * Displays the users table with the info of the users
function Users(props) {
    // * If "blank" makes a get request to all users, if false doesn't do anything, everything else
    // * will make a call looking for a specific user
    const { newSearch } = props;

    // * Media queries to handle when to render columns of the table
    const isSmallScreen = useMediaQuery({ query: '(min-width: 576px)' });
    const isMediumScreen = useMediaQuery({ query: '(min-width: 768px)' });
    const isLargeScreen = useMediaQuery({ query: '(min-width: 992px)' });

    const [users, setUsers] = useState([]);

    useEffect(async () => {
        try {
            const response = await axios.get('https://jh-endpoint-api.herokuapp.com/users');
            setUsers(response.data);
        } catch (error) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        }

    }, []);

    // * If false doesn't do anything, "blank" does a get request of all users, everything else 
    // * makes a specific user get request 
    useEffect(async () => {
        if (newSearch !== false) {
            try {
                let response;
                if (newSearch === "blank") {
                    response = await axios.get(`https://jh-endpoint-api.herokuapp.com/users`);
                } else {
                    response = await axios.get(`https://jh-endpoint-api.herokuapp.com/users/${newSearch}`);
                }
                setUsers(response.data);
            } catch (error) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        }
    }, [newSearch]);

    return <>
        <Table borderless >
            <thead className='table-styles'>
                <tr>
                    <th>#</th>
                    <th>Username</th>
                    {isSmallScreen && <th>First Name</th>}
                    {isMediumScreen && <th>Last Name</th>}
                    {isLargeScreen && <><th>Age</th>
                        <th>Email</th></>}
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody className='table-styles table-body'>
                {/* If the array length if higher or equal to 1 it means there's more than one user  */}
                {users.length >= 1 ?
                    users.map((user, index) => {
                        return <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{user.username}</td>
                            {isSmallScreen && <td>{user.firstName}</td>}
                            {isMediumScreen && <td>{user.lastName}</td>}
                            {isLargeScreen && <><td>{user.age}</td><td>{user.email}</td></>}
                            <td>
                                <NavLink to={`/users/${user.username}`}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </NavLink>
                            </td>
                        </tr>
                    })
                    :
                    // * If there is only one user it does these
                    <tr>
                        <td>1</td>
                        <td>{users.username}</td>
                        {isSmallScreen && <td>{users.firstName}</td>}
                        {isMediumScreen && <td>{users.lastName}</td>}
                        {isLargeScreen && <><td>{users.age}</td><td>{users.email}</td></>}
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