import React from 'react';
import { NavLink } from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import MyButton from '../Button/Button';
import './Home.scss';


function Home() {
    return <div className='home'>
        <Jumbotron className="p-0 m-0">
            <h1 className="mb-5">ENDPOINT</h1>
            <p className="mb-5">
                A REST API to make C.R.U.D operations
            </p>
            <NavLink to="/docs">
                <MyButton text={'see more'} />
            </NavLink>
        </Jumbotron>
    </div>
}

export default Home;