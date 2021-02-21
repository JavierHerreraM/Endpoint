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
import validateUser from './inputValidation.js';

import Alert from '../alert/Alert';
import './userPanel.scss';

function UserPanel() {
    const { pathname } = useLocation();
    let [isUpdate, setIsUpdate] = useState(false);
    let [redirect, setRedirect] = useState(false);
    let [showAlert, setShowAlert] = useState(false);
    let [inputError, setInputError] = useState({ path: "", message: "" });

    let [user, setUser] = useState({
        username: "",
        firstName: "",
        lastName: "",
        age: 0,
        mail: "",
    });

    useEffect(async () => {
        if (pathname !== "/users/new") {
            try {
                setIsUpdate(true);
                const response = await axios.get(`https://jh-endpoint-api.herokuapp.com${pathname}`);
                setUser(response.data);
            } catch (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                }
            }
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
        try {
            const response = await axios.delete(`https://jh-endpoint-api.herokuapp.com/users/${user.username}`);
            setRedirect(true);
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            }
        }
    }

    async function handleSave(event) {
        event.preventDefault();
        const { error } = validateUser(user);
        if (error) {
            setInputError({
                path: error.details[0].path[0],
                message: error.details[0].message
            });
        } else {
            try {
                if (isUpdate) {
                    const response = await axios.put(`https://jh-endpoint-api.herokuapp.com${pathname}`, {
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        age: user.age,
                        mail: user.mail
                    });
                    setRedirect(true);
                } else {
                    const response = await axios.post(`https://jh-endpoint-api.herokuapp.com/users`, user);
                    setRedirect(true);
                }
            } catch (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                }
            }
        }
    }

    return <Container className="users-panel p-0" fluid="md">
        <Row className="mx-0">
            <h3 className="mb-2 mr-auto" >{isUpdate === false ? "Create new user" : user.username}</h3>
            {isUpdate && <MyButton classes="mb-2" text="delete" functionality={() => { setShowAlert(true) }} color="danger" ><FontAwesomeIcon className='ml-1' icon={faTrashAlt} /></MyButton>}
        </Row>
        <Form onSubmit={handleSave}>
            <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" value={user.username} placeholder="Username" onChange={handleChange} />
                <Form.Text className="text-muted">{inputError.path === "username" && `${inputError.message}`}</Form.Text>
            </Form.Group>
            <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" value={user.firstName} placeholder="First name" onChange={handleChange} />
                <Form.Text className="text-muted">{inputError.path === "firstName" && `${inputError.message}`}</Form.Text>
            </Form.Group>
            <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" value={user.lastName} placeholder="Last name" onChange={handleChange} />
                <Form.Text className="text-muted">{inputError.path === "lastName" && `${inputError.message}`}</Form.Text>
            </Form.Group>
            <Form.Group controlId="age">
                <Form.Label>Age</Form.Label>
                <Form.Control type="number" value={user.age} placeholder="18" onChange={handleChange} />
                <Form.Text className="text-muted">{inputError.path === "age" && `${inputError.message}`}</Form.Text>
            </Form.Group>
            <Form.Group controlId="mail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="Email" value={user.mail} placeholder="mymail@email.com" onChange={handleChange} />
                <Form.Text className="text-muted">{inputError.path === "mail" && `${inputError.message}`}</Form.Text>
            </Form.Group>
            <Row className="mx-0 mt-4">
                <NavLink className="mr-auto" to="/users">
                    <MyButton text='cancel' color="secondary" ><FontAwesomeIcon className='ml-1' icon={faUndoAlt} /></MyButton>
                </NavLink>
                <MyButton type="submit" text='save' functionality={handleSave} color="secondary" ><FontAwesomeIcon className='ml-1' icon={faSave} /></MyButton>
            </Row>
        </Form>
        {redirect && <Redirect push to="/users" />}
        <Alert
            show={showAlert}
            alertType="confirm"
            username={user.username}
            handleDelete={handleDelete}
            setReturnShow={setShowAlert}
        />
    </Container>;
}

export default UserPanel;