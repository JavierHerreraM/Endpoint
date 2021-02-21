import React, { useState } from 'react';
import axios from 'axios';
import Alert from '../alert/Alert';

function Interceptor() {
    let [showAlert, setShowAlert] = useState(false);
    let [alertType, setAlertType] = useState("");
    let [errorInfo, setErrorInfo] = useState({});

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

    return <>
        <Alert
            show={showAlert}
            alertType={alertType}
            setReturnShow={setShowAlert}
            error={errorInfo}
        />
    </>;
}

export default Interceptor;