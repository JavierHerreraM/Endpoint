import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useLocation } from 'react-router-dom';
import MyButton from '../Button/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrashAlt, faUndoAlt } from '@fortawesome/free-solid-svg-icons';
import { NavLink, Redirect } from 'react-router-dom';

function UserPanel() {
    const { pathname } = useLocation();
    let [isUpdate, setIsUpdate] = useState(false);
    let [redirect, setRedirect] = useState(false);

    let [user, setUser] = useState({
        username: "Username",
        firstName: "First name",
        lastName: "Last name",
        age: 18,
        mail: "something@gmail.com",
    });

    useEffect(async () => {
        if (pathname !== "/users/new") {
            setIsUpdate(true);
            const response = await axios.get(`https://jh-endpoint-api.herokuapp.com${pathname}`);
            setUser(response.data);
        }
    }, []);

    function handleChange(event) {
        const property = event.target.id;
        const value = event.target.value;
        setUser((prevValues) => {
            return {
                ...prevValues,
                [property]: value
            }
        });
    }

    async function handleDelete() {
        const response = await axios.delete(`https://jh-endpoint-api.herokuapp.com/users/${user.username}`);
        console.log(response.data);
        setRedirect(true);
    }

    async function handleSave(event) {
        event.preventDefault();
        if (isUpdate) {
            const response = await axios.put(`https://jh-endpoint-api.herokuapp.com/users/${user.username}`, {
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                age: user.age,
                mail: user.mail
            });
            console.log(response.data);
            setRedirect(true);
        } else {
            const response = await axios.post(`https://jh-endpoint-api.herokuapp.com/users`, user);
            console.log(response.data);
            setRedirect(true);
        }

    }

    return <Container className="p-0" fluid="md">
        <Row className="mx-0">
            <h3 className="mb-2 mr-auto" >{isUpdate === false ? "Create new user" : user.username}</h3>
            {isUpdate && <MyButton classes="mb-2" text="delete" functionality={handleDelete} color="danger" ><FontAwesomeIcon className='ml-1' icon={faTrashAlt} /></MyButton>}
        </Row>
        <Form onSubmit={handleSave}>
            <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" value={user.username} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" value={user.firstName} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" value={user.lastName} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="age">
                <Form.Label>Age</Form.Label>
                <Form.Control type="number" value={user.age} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="mail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="Email" value={user.mail} onChange={handleChange} />
            </Form.Group>
            <Row className="mx-0 mt-4">
                <NavLink className="mr-auto" to="/users">
                    <MyButton text='cancel' color="secondary" ><FontAwesomeIcon className='ml-1' icon={faUndoAlt} /></MyButton>
                </NavLink>
                <MyButton type="submit" text='save' functionality={handleSave} color="secondary" ><FontAwesomeIcon className='ml-1' icon={faSave} /></MyButton>
            </Row>
        </Form>
        {redirect && <Redirect push to="/users" />}
    </Container>;
}

export default UserPanel;