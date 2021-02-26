import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import './button.scss';

// * A reusable button
function MyButton(props) {
    const { type = "button", classes, text, functionality, color, children } = props;

    return <Button
        type={type}
        className={`button ${classes}`}
        variant={color}
        onClick={functionality}
    >{text}{children}</Button>;
};

// * type: changes the type of the button
// * classes: the classes assigned to the button where its called
// * text: the text that the button is going to display
// * functionality: the behavior of the button
// * color: changes the color of the button from the bootstrap options
// * children: any component that is passed inside the button
MyButton.propTypes = {
    type: PropTypes.string,
    classes: PropTypes.string,
    text: PropTypes.string,
    functionality: PropTypes.func,
    color: PropTypes.string,
    children: PropTypes.node
};

export default MyButton;