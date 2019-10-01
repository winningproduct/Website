import React from 'react';
import '../pages/canvas/canvas.css'
import types from "../pages/canvas/types.json";
import SideCanvasItem from './CanvasSideLineItem';
import Aux from './hocAux';
const type = types.type;


const SideCanvas = (props) => {
    let hightTypes = props.sidelineHeight;
    const typeGenarator = () => {
        let style = {};
        type.map((type, i) => {
            if (i === 0) {
                style[`${type}`] = { height: `${hightTypes[type] + 150}px` }
            } else {
                style[`${type}`] = { height: `${hightTypes[type]}px` }
            }
        });
        return style;
    }
    let style = typeGenarator();

    const divGenarator = () => {
        return type.map((type) => {
            return <SideCanvasItem sideStyle={style[type]} name={type} />
        })
    }
    return (
        <Aux>
            {divGenarator()}
        </Aux>
    )
}

export default SideCanvas;