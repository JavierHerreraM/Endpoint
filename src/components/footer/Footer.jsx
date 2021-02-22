import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithubSquare } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import './footer.scss';

function Footer() {
    return <>
        <footer>
            <div className='footer-body'>
                <h1>ENDPOINT</h1>
                <div className='footer-contact'>
                    <h4>Contact:</h4>
                    <ul>
                        <li><p><FontAwesomeIcon icon={faEnvelope} />Javiherreramad@gmail.com</p></li>
                        <li><a className='footer-link' href="https://github.com/JavierHerreraM" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGithubSquare} />Github</a></li>
                        <li><a className='footer-link' href="https://www.linkedin.com/in/javier-herrera-madrigal" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} />Linkedin</a></li>
                    </ul>
                </div>
            </div>
            <p className='footer-copyright'>© 2020, Javier Herrera M.</p>
        </footer>
    </>;
}

export default Footer;