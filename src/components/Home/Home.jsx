import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import MyButton from '../Button/Button';
import './Home.scss';


function Home() {
    return <>
        <Jumbotron className="home">
            <h1 className="mb-5">ENDPOINT</h1>
            <p className="mb-5">
                A REST API to make C.R.U.D operations
            </p>
            <MyButton text={'see more'} />
        </Jumbotron>
    </>
}

export default Home;