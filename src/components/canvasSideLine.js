import React from 'react';
import '../pages/canvas/canvas.css'
import SideCanvasItem from './CanvasSideLineItem';
import Aux from './hocAux';

const SideCanvas = (props) => {
    let hightTypes = props.sidelineHeight;
    let edge = props.directory;
    let directoryNames = [];

    // get directory Names
    edge.map((nodesX) => {
        directoryNames.push(nodesX.node.title)
    });
    directoryNames.sort();

    // genarate sidebar custom styles acording to each directory name
    // each directory name come with prefix number , so has to split out the number part 
    // ex ->  1-Explore to Explore 
    const typeGenarator = () => {
        let style = {};
        directoryNames.map((type, i) => {
            if (i === 0) {
                style[`${type.split('-')[1]}`] = { height: `${hightTypes[type.split('-')[1]] + 150}px` }
            } else {
                style[`${type.split('-')[1]}`] = { height: `${hightTypes[type.split('-')[1]]}px` }
            }
        });
        return style;
    }
    let style = typeGenarator();

    // create each div for created directory 
    const divGenarator = () => {
        return directoryNames.map((type, i) => {
            return <SideCanvasItem key={i} sideStyle={style[type.split('-')[1]]} name={type.split('-')[1]} />
        })
    }
    return (
        <Aux>
            {divGenarator()}
        </Aux>
    )
}

export default SideCanvas;