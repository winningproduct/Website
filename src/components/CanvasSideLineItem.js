import React from 'react';
import '../pages/canvas/canvas.css'
import Aux from './Hoc/Aux';

const SideCanvasItem = (props) => {
    return (
        <Aux>
            <div style={props.sideStyle} className='row text-align-center lh'>
                <span className="textCanvas">{props.name}</span>
            </div>
        </Aux>
    )
}

export default SideCanvasItem;