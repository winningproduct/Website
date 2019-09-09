import React from 'react';
import Layout from '../../components/Layout'
import { FlowChartWithState } from "@mrblenny/react-flow-chart";
import styled from 'styled-components'
import data from "./data.json";

let nodes = data.nodes;
let nody = {}
let allLinks = {}
let bigNode = {};
let linkCount = 0;

let color = (type) => {
    switch (type) {
        case '1-userExperience':
            return 'rgb(255, 171, 64)';
        case '2-marketSense':
            return 'rgb(142, 124, 195)';
        case '4-customerSuccess':
            return 'rgb(109, 158, 235)';
        case '3-technologyExcellence':
            return 'rgb(106, 168, 79)';
        default:
            return null;
    }
}

let xPos = (type) => {
    switch (type) {
        case '1-userExperience':
            return 0;
        case '2-marketSense':
            return 150;
        case '4-customerSuccess':
            return 300;
        case '3-technologyExcellence':
            return 450;
        default:
            return null;
    }
}

let yPos = (type) => {
    switch (type) {
        case '1-Explore':
            return { y: 0 };
        case '2-Focus':
            return { y: 800 };
        default:
            return null;
    }
}

nodes.sort((current, next) => (current.group > next.group) ? 1 : (current.group === next.group) ? ((current.type > next.type) ? 1 : ((current.order > next.order) ? 1 : -1)) : -1);


nodes.map((node, i) => {

    // node structure
    let colorType = color(node.type);
    let pos = yPos(node.group);
    let ports = {}

    let out = {
        port1: {
            id: "port1",
            type: "output"
        }
    }
    ports = Object.assign(ports, out);

    let input = {
        port2: {
            id: "port2",
            type: "input"
        }
    }
    ports = Object.assign(ports, input);

    nody = {
        id: node.id,
        title: node.title,
        color: colorType,
        type: "default",
        url: node.url,
        position: {
            x: 50 + xPos(node.type),
            y: node.order * 150 + pos.y
        },
        ports: ports
    };

    bigNode[`${node.id}`] = nody;

    // link structure
    node.to.map((link, i) => {
        let linkd = {
            id: `link${linkCount + 1}`,
            from: {
                nodeId: node.id,
                portId: "port1"
            },
            to: {
                nodeId: link,
                portId: "port2"
            }
        }
        linkCount++;
        allLinks[`link${linkCount}`] = linkd;
        return true;
    });
    return true;
});

const complexChart = {
    offset: {
        x: 600,
        y: 0
    },
    nodes: bigNode,
    links: allLinks,
    selected: {},
    hovered: {}
}


const Outer = styled.div`
    padding: 30px;
    border-radius: 4px;
    box-shadow: 0px 0px 0px 0px rgba(239, 235, 233, 0),
    0px 0px 5px 5px rgba(144, 148, 154, 0.38);
`
const CanvasOuterCustom = styled.div`
  text-align: center
  position: relative;
  background-size: 10px 10px;
  background-color: #fff;
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: not-allowed;
  outline: none !important;
`

const NodeInnerCustom = ({ node }) => {
    let style = {
        "backgroundColor": node.color
    }
    if (node.type) {
        return (
            <Outer style={style}>
                {node.id.replace(/_/g, ' ')}
                <br />
                <a href={node.url}>Link</a>
            </Outer>
        )
    }
}

export default class CanvasIndexPage extends React.Component {
    render() {
        return (
            <Layout>
                <div>
                    <FlowChartWithState Components={{
                        NodeInner: NodeInnerCustom,
                        CanvasOuter: CanvasOuterCustom,
                    }} initialValue={complexChart} />
                </div>
            </Layout>
        )
    }
}
