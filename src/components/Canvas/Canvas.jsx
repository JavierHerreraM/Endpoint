import React from 'react';
import './Canvas.scss';

function Canvas(props) {
    return <main fluid="true" className="canvas p-2">
        {props.children}
    </main>
}

export default Canvas;