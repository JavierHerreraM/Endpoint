import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useLocation, NavLink, Redirect } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrashAlt, faUndoAlt } from '@fortawesome/free-solid-svg-icons';
import MyButton from '../common/button/Button';
import validateUser from './inputValidation.js';
import Alert from '../common/alert/Alert';
import './userPanel.scss';

// ! when making a request be careful with the object because the request doesn't accept the _id and v properties
// * A form component use to create or update users
function UserPanel() {
    // * Grabs the path of the current location
    const { pathname } = useLocation();

    // * Depending on this variable it makes post or put request to the server 
    let [isUpdate, setIsUpdate] = useState(false);

    // * If true render a component that redirects the user to the dashboard view
    let [redirect, setRedirect] = useState(false);

    // * Variable to use the Alert component, if true the alert pops in the screen
    let [showAlert, setShowAlert] = useState(false);

    // * If true display a text under the input field with the error
    let [inputError, setInputError] = useState({ path: "", message: "" });

    // * The user data, used to display it on screen and make the requests
    let [user, setUser] = useState({
        username: "",
        firstName: "",
        lastName: "",
        age: 0,
        mail: "",
    });

    // * Reusable function to call and set user body
    const userBody = () => {
        return {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            age: user.age,
            mail: user.mail
        }
    }

    // * Reusable funtionc to log the error.response of the requests
    const errorLogs = (error) => {
        console.log(error.data);
        console.log(error.status);
        console.log(error.headers);
    }

    useEffect(async () => {
        // * If pathname === new is means is creating a users instead of updating one
        if (pathname !== "/users/new") {
            try {
                setIsUpdate(true);
                // * Grabs the username from the pathname
                const response = await axios.get(`https://jh-endpoint-api.herokuapp.com${pathname}`);
                setUser(response.data);
            } catch (error) {
                if (error.response) {
                    errorLogs(error.response);
                } else if (error.request) {
                    // * Enters here if there was something wrong with the request on its own
                    console.log(error.request);
                }
            }
        }
    }, []);

    // * Sets the controlled fields
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

    // * handles the delete request
    const handleDelete = async () => {
        try {
            await axios.delete(`https://jh-endpoint-api.herokuapp.com/users/${user.username}`);
            setRedirect(true);
        } catch (error) {
            if (error.response) {
                errorLogs(error.response);
            } else if (error.request) {
                // * Enters here if there was something wrong with the request on its own
                console.log(error.request);
            }
        }
    }

    // * Manages either the POST or PUT request
    const handleSave = async (event) => {
        event.preventDefault();

        // * First checks for an input error
        const { error } = validateUser(userBody());
        if (error) {
            // * If there is an error is set the error data to show it on screen
            setInputError({
                path: error.details[0].path[0],
                message: error.details[0].message
            });
        } else {
            try {
                // * If it's update does a put request
                if (isUpdate) {
                    await axios.put(`https://jh-endpoint-api.herokuapp.com${pathname}`, userBody());
                    setRedirect(true);
                } else {
                    // * If it's create does a post request
                    await axios.post(`https://jh-endpoint-api.herokuapp.com/users`, userBody());
                    setRedirect(true);
                }
            } catch (error) {
                if (error.response) {
                    errorLogs(error.response);
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
                {inputError.path === "username" && <Form.Text className="text-muted">{inputError.message}</Form.Text>}
            </Form.Group>
            <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" value={user.firstName} placeholder="First name" onChange={handleChange} />
                {inputError.path === "firstName" && <Form.Text className="text-muted">{inputError.message}</Form.Text>}
            </Form.Group>
            <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" value={user.lastName} placeholder="Last name" onChange={handleChange} />
                {inputError.path === "lastName" && <Form.Text className="text-muted">{inputError.message}</Form.Text>}
            </Form.Group>
            <Form.Group controlId="age">
                <Form.Label>Age</Form.Label>
                <Form.Control type="number" value={user.age} placeholder="18" onChange={handleChange} />
                {inputError.path === "age" && <Form.Text className="text-muted">{inputError.message}</Form.Text>}
            </Form.Group>
            <Form.Group controlId="mail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="Email" value={user.mail} placeholder="mymail@email.com" onChange={handleChange} />
                {inputError.path === "mail" && <Form.Text className="text-muted">{inputError.message}</Form.Text>}
            </Form.Group>
            <Row className="mx-0 mt-4">
                <NavLink className="mr-auto" to="/users">
                    <MyButton text='cancel' color="secondary" ><FontAwesomeIcon className='ml-1' icon={faUndoAlt} /></MyButton>
                </NavLink>
                <MyButton type="submit" text='save' functionality={handleSave} color="secondary" ><FontAwesomeIcon className='ml-1' icon={faSave} /></MyButton>
            </Row>
        </Form>
        {/* When redirect is true it render the component causing the page to redirect to the given location */}
        {redirect && <Redirect push to="/users" />}
        <Alert
            show={showAlert}
            alertType="confirm"
            username={user.username}
            activateFunction={handleDelete}
            disableShow={setShowAlert}
        />
    </Container>;
}

export default UserPanel;