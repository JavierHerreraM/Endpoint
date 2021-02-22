import React, { useState } from 'react';
import axios from 'axios';
import Alert from '../common/alert/Alert';

// * Intercepts the responses of the http requests and shows an alert accordingly 
function Interceptor() {
    // * If true the alert shows in the ui
    let [showAlert, setShowAlert] = useState(false);

    // * Depending on the type the alert changes the info display
    let [alertType, setAlertType] = useState("");

    // * Sends the error data to the alert to display it
    let [errorInfo, setErrorInfo] = useState({});

    // * Return response and retrun Promise.reject(error) are necessary
    axios.interceptors.response.use((response) => {
        if (response) {
            switch (response.config.method) {
                case "post":
                    setShowAlert(true);
                    setAlertType("post");
                    break;
                case "put":
                    setShowAlert(true);
                    setAlertType("put");
                    break;
                case "delete":
                    setShowAlert(true);
                    setAlertType("delete");
                    break;
                default:
                    break;
            }
        }
        return response;
    }, function (error) {
        setShowAlert(true);
        setAlertType("error");
        setErrorInfo(error.response);
        return Promise.reject(error);
    });

    return <Alert
        show={showAlert}
        alertType={alertType}
        disableShow={setShowAlert}
        error={errorInfo}
    />;
}

export default Interceptor;