import React from 'react';
import { Helmet } from 'react-helmet';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import info from './assets/documentation';
import './documentation.scss';

// * A documentation component about the use of the api
function Documentation() {
    return <>
        <Helmet><title>Documentation - Endpoint</title></Helmet>
        <Container className="p-0 docs" fluid="md">
            <h3 className="mb-3">Documentation</h3>

            {info.map((article, index) => {
                return <div key={index} >
                    <h4 className="mb-2">{article.title}</h4>

                    {/* Display the request and route labels and its info */}
                    {article.labels.map((label, index) => {
                        return <div key={`request${index}`} className="docs-label">
                            <h4 className="mb-2">{index === 0 ? "Request: " : "Route: "}</h4><p>{label}</p>
                        </div>
                    })}

                    {/* Inserts the p with its info into the docs */}
                    {article.body.map((paragraph, index) => <p key={`paragraph${index}`} className="mb-2">{paragraph}</p>)}

                    {/* Displays the images and some labels */}
                    <div className="docs-imgs">
                        {article.img.map((img, index) => {
                            return <div key={`img${index}`}>
                                {/* If the array has more than one img it changes the h4 text accordingly */}
                                <h4 className="mb-2 docs-example">{index > 0 ? "Example request body:" : "Example response object:"}</h4>
                                <Image className="mb-4" src={img} fluid />
                            </div>
                        })}
                    </div>
                </div>
            })}
        </Container>
    </>
}

export default Documentation;
