import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useLocation } from 'react-router-dom';
import MyButton from '../Button/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrashAlt, faUndoAlt } from '@fortawesome/free-solid-svg-icons';

function User() {
    const { pathname } = useLocation();

    let [user, setUser] = useState({
        username: "default username",
        firstName: "default first name",
        lastName: "default last name",
        age: 18,
        email: "default@mail.com",
    });

    useEffect(async () => {
        const response = await axios.get(`https://jh-endpoint-api.herokuapp.com${pathname}`);
        setUser(response.data);
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

    function handleDelete() {
        console.log('Delete');
    }

    function handleSave() {
        console.log('save');
    }

    function handleCancel() {
        console.log('Cancel');
    }

    return <Container className="p-0" fluid="md">
        <Row className="mx-0">
            <h3 className="mr-auto">username</h3>
            <MyButton classes="mb-2" text="delete" functionality={handleDelete} color="danger" ><FontAwesomeIcon className='ml-1' icon={faTrashAlt} /></MyButton>
        </Row>
        <Form>
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
            <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="Email" value={user.email} onChange={handleChange} />
            </Form.Group>
            <Row className="mx-0 mt-4">
                <MyButton classes="mr-auto" text='cancel' functionality={handleCancel} color="secondary" ><FontAwesomeIcon className='ml-1' icon={faUndoAlt} /></MyButton>
                <MyButton text='save' functionality={handleSave} color="secondary" ><FontAwesomeIcon className='ml-1' icon={faSave} /></MyButton>
            </Row>
        </Form>
    </Container>;
}

export default User;