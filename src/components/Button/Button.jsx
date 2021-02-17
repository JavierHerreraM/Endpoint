import React from 'react';
import Button from 'react-bootstrap/Button';
import './Button.scss';

function MyButton(props) {
    const { text } = props;
    return <>
        <Button className="button" variant="secondary">{text}</Button>
    </>
}

export default MyButton;