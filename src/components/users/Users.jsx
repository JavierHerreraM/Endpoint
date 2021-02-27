import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import './users.scss';

// * Displays the users table with the info of the users
function Users(props) {
    const { newSearch, pageNumber, showPagination } = props;

    // * Media queries to handle when to render columns of the table
    const isSmallScreen = useMediaQuery({ query: '(min-width: 576px)' });
    const isMediumScreen = useMediaQuery({ query: '(min-width: 768px)' });
    const isLargeScreen = useMediaQuery({ query: '(min-width: 992px)' });

    // * Stores the users from the get request
    let [users, setUsers] = useState([]);
    // * Stores the users that are going to be display
    let [showUsers, setShowUsers] = useState([]);

    // * Get all the users when the component mounts
    useEffect(async () => {
        try {
            const response = await axios.get('https://jh-endpoint-api.herokuapp.com/users');
            setUsers(response.data.reverse());
        } catch (error) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        }
    }, []);

    // * makes a get request to a specific user define by a search, depends on newSearch
    useEffect(async () => {
        // * If false doesn't do anything
        if (newSearch !== false) {
            try {
                let response;
                // * "blank" does a get request of all users
                if (newSearch === "blank") {
                    response = await axios.get(`https://jh-endpoint-api.herokuapp.com/users`);
                    setUsers(response.data.reverse());
                } else {
                    response = await axios.get(`https://jh-endpoint-api.herokuapp.com/users/${newSearch}`);
                    // * Wraps it in [] to make it an array
                    setUsers([response.data]);
                }
            } catch (error) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        }
    }, [newSearch]);


    // * pageMaxUsers is the max amount of users that is going to show on screen
    const pageMaxUsers = 8;

    // * In here i divide the users in arrays of 8, it depends on the pageNumber and users variables
    useEffect(() => {
        // * If the amount of users is less than 8 it doesn't divide them
        if (users.length <= pageMaxUsers) {
            if (users.length >= 1) {
                setShowUsers(users);
            } else {
                // * If there's only one user it's put in an array so I don't have to change the map in the return
                setShowUsers([users]);
            }
            // * Sets the pagination to false so it doesn't show
            showPagination(false);
        } else {
            // * Slices 8 users from the response users, which users depends on the page number from the pagination
            const maxValue = (pageMaxUsers * pageNumber);
            const minValue = maxValue - pageMaxUsers;
            const sliceUsers = users.slice(minValue, maxValue);
            setShowUsers(sliceUsers);
            // * Sets the pagination the number of pages to show
            const numberOfPages = Math.ceil(users.length / pageMaxUsers);
            showPagination(numberOfPages);
        }
    }, [pageNumber, users]);

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
                {showUsers.map((user, index) => {
                    return <tr key={index}>
                        <td>{((pageNumber * 8 - 8) + index) + 1}</td>
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
                })}
            </tbody>
        </Table>
    </>
};

Users.propTypes = {
    newSearch: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
    ]),
    pageNumber: PropTypes.number,
    showPagination: PropTypes.func
};

export default Users;