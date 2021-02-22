import React, { useState, useEffect } from 'react';
import Toast from 'react-bootstrap/Toast'
import MyButton from '../button/Button';
import './alert.scss';

// * Alert is a component that shows a modify alert on activation
function Alert(props) {
    // * show: if true shows the alert on the ui
    // * alertType: receives the cases of the switch
    // * username: is for show the username in the alerts info
    // * activateFunction: is a reference to the function that takes place when clicking the button
    // * disableShow: a reference to a function that sets show on false
    // * error: object with information to show an error alert
    const { show = false, alertType, username, activateFunction, disableShow, error } = props;

    let header, body, btn, autohide, showButton;

    // * If true the alert pops in the ui
    let [showAlert, setShowAlert] = useState(false);

    // * Sets showAlert every time  show changes
    useEffect(() => { setShowAlert(show) }, [show]);

    const toggleShow = () => setShowAlert(!showAlert);

    const buttonBehavior = () => {
        activateFunction();
        setShowAlert(false);
    }

    const handleClose = () => {
        toggleShow();
        disableShow(false);
    }

    // * Depending on the type of alert sets different info to show on the alert
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

    {/* If autohide ==== true the alert disappears after delay time */ }
    return <Toast className="alert-styles" show={showAlert} onClose={handleClose} autohide={autohide} delay={3000} >
        <Toast.Header><h4 className="mr-auto mb-0">{header}</h4></Toast.Header>
        <Toast.Body>
            <p>{body}</p>
            {/* If show button true the alert has a button */}
            {showButton && <MyButton text={btn.text} color={btn.color} functionality={buttonBehavior} />}
        </Toast.Body>
    </Toast>;
}

export default Alert;