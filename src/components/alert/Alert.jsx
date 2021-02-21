import React, { useState, useEffect } from 'react';
import Toast from 'react-bootstrap/Toast'
import MyButton from '../Button/Button';
import './alert.scss';

function Alert(props) {
    const { show = false, alertType, username, handleDelete, setReturnShow, error } = props;

    let header, body, btn, autohide, showButton;

    switch (alertType) {
        case "post":
            header = "Success!";
            body = "User successfully created";
            showButton = false;
            autohide = true;
            break;
        case "put":
            header = "Success!";
            body = "User successfully updated";
            showButton = false;
            autohide = true;
            break;
        case "delete":
            header = "Success!";
            body = "User successfully deleted";
            showButton = false;
            autohide = true;
            break;
        case "confirm":
            header = `Delete user: ${username}`;
            body = "Do you really want to delete this user?";
            showButton = true;
            btn = {
                text: "continue",
                color: "danger"
            };
            autohide = false;
            break;
        case "error":
            header = `Error: ${error.status}`;
            body = error.data;
            showButton = false;
            autohide = true;
            break;
        default:
            break;
    }

    let [showAlert, setShowAlert] = useState(false);

    useEffect(() => { setShowAlert(show) }, [show]);

    const toggleShow = () => setShowAlert(!showAlert);

    function btnBehavior() {
        handleDelete();
        setShowAlert(false);
    }

    function handleClose() {
        setReturnShow(false);
        toggleShow();
    }

    return <>
        <Toast className="alert-styles" show={showAlert} onClose={handleClose} autohide={autohide} delay={3000} >
            <Toast.Header><h4 className="mr-auto mb-0">{header}</h4></Toast.Header>
            <Toast.Body>
                <p>{body}</p>
                {showButton && <MyButton text={btn.text} color={btn.color} functionality={btnBehavior} />}
            </Toast.Body>
        </Toast>
    </>;
}

export default Alert;