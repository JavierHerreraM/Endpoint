import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import info from './assets/documentation';
import './Documentation.scss';

function Documentation() {
    return <Container className="p-0" fluid="md">
        {info.map((article, index) => {
            return <Row className="mb-4" key={index}>
                <h3 className="mb-2">{article.title}</h3>
                <p className="mb-2">{article.body}</p>
                <h4 className="mb-2">Example:</h4>
                <Image src={article.img} fluid />
            </Row>
        })}
    </Container>
}

export default Documentation;