import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import info from './assets/documentation';
import './Documentation.scss';

function Documentation() {
    return <Container className="p-0 docs" fluid="md">
        <h3 className="mb-3">Documentation</h3>
        {info.map((article, index) => {
            return <div key={index} >
                <h4 className="mb-2">{article.title}</h4>
                <p className="mb-2">{article.body}</p>
                <p className="mb-2">Example:</p>
                <Image className="mb-4" src={article.img} fluid />
            </div>
        })}
    </Container>
}

export default Documentation;