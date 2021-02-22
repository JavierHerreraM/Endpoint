import React from 'react';
import Button from 'react-bootstrap/Button';
import './button.scss';

// * A reusable button
function MyButton(props) {
    // * type: changes the type of the button
    // * classes: the classes assigned to the button where its called
    // * text: the text that the button is going to display
    // * functionality: the behavior of the button
    // * color: changes the color of the button from the bootstrap options
    // * children: any component that is passed inside the button
    const { type = "button", classes, text, functionality, color, children } = props;

    return <Button
        type={type}
        className={`button ${classes}`}
        variant={color}
        onClick={functionality}
    >{text}{children}</Button>;
}

export default MyButton;