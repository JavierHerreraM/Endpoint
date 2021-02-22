import React from 'react';
import './canvas.scss';

// * Canvas is basically a container with some default styles to have consistency
function Canvas(props) {
    return <main fluid="true" className="canvas p-2">
        {props.children}
    </main>
}

export default Canvas;