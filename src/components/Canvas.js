import React from 'react';
import '../pages/canvas/canvas.css'
import '../pages/canvas/print.css';
import { FlowChartWithState } from "@mrblenny/react-flow-chart";
import { CanvasInnerCustom, Outer } from './styleComponents';
import styled from 'styled-components'

const NodeInnerCustom = ({ node }) => {
    if (node.type) {
        return (
            <Outer style={{ background: `linear-gradient(to bottom , ${node.color} , white )` }}>
                {node.id.replace(/_/g, ' ')}
                <br />
                <a href={`../models/explore/${node.url}`}>Read More</a>
            </Outer>
        )
    }
}

const Canvas = (props) => {
    const CanvasOuterCustom = styled.div`
    text-align: center
    position: relative;
    background-size: 10px 10px;
    width: auto;
    height: ${(Object.keys(props.complexChart.nodes).length + 2) * 150}px;
    overflow: hidden;
    cursor: not-allowed;
    outline: none !important;
    background-repeat: no-repeat;
    background: linear-gradient(90deg, 
        rgb(255, 171, 64 , 0.1) 0%,
        rgb(255, 171, 64 , 0.1) 25%,
        rgb(142, 124, 195 , 0.1) 25%, 
        rgb(142, 124, 195 , 0.1) 50%,
        rgb(106, 168, 79 , 0.1) 50%,
        rgb(106, 168, 79 , 0.1) 75%,
        rgb(109, 158, 235 , 0.1) 75%,
        rgb(109, 158, 235 , 0.1) 75%);
`;
    return (
        <div>
        {console.log()}
            <FlowChartWithState config={{ readonly: true }} Components={{
                NodeInner: NodeInnerCustom,
                CanvasOuter: CanvasOuterCustom,
                CanvasInner: CanvasInnerCustom
            }} initialValue={props.complexChart} />
        </div>
    );
}

export default Canvas;