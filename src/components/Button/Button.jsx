import React from 'react';
import Button from 'react-bootstrap/Button';
import './Button.scss';

function MyButton(props) {
    const { type = "button", classes, text, functionality, color, children } = props;
    return <>
        <Button type={type} className={`button ${classes}`} variant={color} onClick={functionality}>{text}{children}</Button>
    </>
}

export default MyButton;