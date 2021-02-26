import React from 'react';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrown } from "@fortawesome/free-solid-svg-icons";
import './page404.scss';


function Page404() {
    return <>
        <Helmet><title>Page not found - Endpoint</title></Helmet>
        <div className='page-404'>
            <div>
                <p className="page-404_title">Oops!</p>
                <p>We can't seem to find the page you're looking for.</p>
                <p>Error code: 404</p>
            </div>
            <div>
                <FontAwesomeIcon className="page-404_icon" icon={faFrown} />
            </div>
        </div>
    </>
};

export default Page404;