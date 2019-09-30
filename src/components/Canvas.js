import React from 'react';
import '../pages/canvas/canvas.css'
import '../pages/canvas/print.css';
import { FlowChartWithState } from "@mrblenny/react-flow-chart";
import { CanvasInnerCustom, Outer, CanvasOuterCustom } from './styleComponents';

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
    return (
        <div>
            <FlowChartWithState config={{ readonly: true }} Components={{
                NodeInner: NodeInnerCustom,
                CanvasOuter: CanvasOuterCustom,
                CanvasInner: CanvasInnerCustom
            }} initialValue={props.complexChart} />
        </div>
    );
}

export default Canvas;