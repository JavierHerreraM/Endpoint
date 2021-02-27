import React from 'react';
import PropTypes from 'prop-types';
import './canvas.scss';

// * Canvas is basically a container with some default styles to have consistency
function Canvas(props) {
    const { children } = props;
    return <main fluid="true" className="canvas pt-2">
        {children}
    </main>
};

Canvas.propTypes = { props: PropTypes.element };

export default Canvas;
