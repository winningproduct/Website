import React from 'react';
import Layout from '../../components/Layout'
import { FlowChartWithState } from "@mrblenny/react-flow-chart";
import styled from 'styled-components'
import data from "./data.json";

import build from '../../img/build-2.svg';
import explore from '../../img/explore-2.svg';
import focus from '../../img/focus-2.svg';
import harvest from '../../img/harvest-2.svg';
import immerse from '../../img/immerse-2.svg';
import optimize from '../../img/optimize-2.svg';
import plan from '../../img/plan-2.svg';
import retier from '../../img/retier-2.svg';
import stabilize from '../../img/stabilize-2.svg';

let nodes = data.nodes;
let singleNode = {}
let allLinks = {}
let bigNode = {};
let linkCount = 0;

const Outer = styled.div`
    padding: 30px;
    border-radius: 4px;
    box-shadow: 0px 0px 0px 0px rgba(239,235,233,0), 
    10px -12px 20px -4px rgba(144,148,154,0.38);
    `
const CanvasInnerCustom = styled.div`
    width: 100%;
    position: relative;
    cursor: move;
`

const NodeInnerCustom = ({ node }) => {
    if (node.type) {
        return (
            <Outer style={{ background: `linear-gradient(to bottom , ${node.color} , white )` }}>
                {node.id.replace(/_/g, ' ')}
                <br />
                <a href={node.url}>Link</a>
            </Outer>
        )
    }
}

export default class CanvasIndexPage extends React.Component {
    state = {
        windowWidth: 1920
    }

    handleResize = () => {
        this.setState({
            windowWidth: window.innerWidth
        });
    };

    componentDidMount() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
    }

    color = (type) => {
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
                return '#9a8d8d1a';
        }
    }

    xPos = (type) => {
        switch (type) {
            case '1-userExperience':
                return 0;
            case '2-marketSense':
                return this.state.windowWidth > 600 ? this.state.windowWidth * 0.1 : 200;
            case '4-customerSuccess':
                return this.state.windowWidth > 600 ? this.state.windowWidth * 0.3 : 500;
            case '3-technologyExcellence':
                return this.state.windowWidth > 600 ? this.state.windowWidth * 0.5 : 700;
            default:
                return null;
        }
    }

    yPos = (type) => {
        switch (type) {
            case '1-Explore':
                return { y: 0 };
            case '2-Focus':
                return { y: 800 };
            case '3-immerse':
                return { y: 1850 };
            case '4-Plan':
                return { y: 3050 };
            case '5-Build':
                return { y: 4700 };
            case '6-Stabilize':
                return { y: 6950 };
            case '7-Optimize':
                return { y: 8900 };
            case '8-Harvest':
                return { y: 10700 };
            case '9-Retire':
                return { y: 11800 };
            default:
                return null;
        }
    }

    complexChart = () => {

        nodes.sort((current, next) => (current.group > next.group) ? 1 : (current.group === next.group) ? ((current.type > next.type) ? 1 : ((current.order > next.order) ? 1 : -1)) : -1);

        nodes.map((node, i) => {

            // node structure
            let colorType = this.color(node.type);
            let pos = this.yPos(node.group);
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

            singleNode = {
                id: node.id,
                title: node.title,
                color: colorType,
                type: "default",
                url: node.url,
                position: {
                    x: 10 + this.xPos(node.type) + node.order * 10,
                    y: node.order * 150 + pos.y
                },
                ports: ports
            };

            bigNode[`${node.id}`] = singleNode;

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

        return {
            offset: {
                x: 0,
                y: 0
            },
            nodes: bigNode,
            links: allLinks,
            selected: {},
            hovered: {}
        }
    }


    render() {

        let style = {
            row: {
                display: "flex"
            },
            left: {
                width: this.state.windowWidth * 0.8
            },
            right: {
                width: this.state.windowWidth * 0.2
            },
            contentExplore: {
                height: "950px",
                textAlign: "center"
            },
            contentFocus: {
                backgroundColor: "#f3f3f3",
                height: "1050px",
                textAlign: "center"
            },
            contentImmerse: {
                height: "1200px",
                textAlign: "center"
            },
            contentPlan: {
                backgroundColor: "#f3f3f3",
                height: "1650px",
                textAlign: "center"
            },
            contentBuild: {
                height: "2250px",
                textAlign: "center"
            },
            contentStabilize: {
                backgroundColor: "#f3f3f3",
                height: "1950px",
                textAlign: "center"
            },
            contentOptimize: {
                height: "1800px",
                textAlign: "center"
            },
            contentHarvest: {
                backgroundColor: "#f3f3f3",
                height: "1100px",
                textAlign: "center"
            },
            contentRetier: {
                height: "1450px",
                textAlign: "center"
            },
            text: {
                "writingMode": "vertical-rl",
                textOrientation: "mixed",
                fontFamily: "sans-serif",
                fontSize:  this.state.windowWidth > 600 ? this.state.windowWidth * 0.2 * 0.25 : "60px",
                fontWeight: "600",
                position: "relative",
                top: "50%",
                transform: "translateY(-50%)"
            }
        }

        let CanvasOuterCustom = styled.div`
            text-align: center
            position: relative;
            background-size: 10px 10px;
            background-color: #fff;
            width: 100%;
            height: 13500px;
            overflow-x: scroll;
            cursor: not-allowed;
            outline: none !important;
            background-position:
                top 0px left 0px, // explore
                top 950px left 0px, // focus
                top 1950px left 0px, // immerse
                top 3100px left 0px, //plan
                top 4750px left 0px, //build
                top 6950px left 0px, //stabilize
                top 8950px left 0px, // optimize
                top 10800px left 0px, // harvest
                top 12050px left 0px; // retier
            background-repeat: no-repeat;
            background-size: 
                100% 800px ,  // explore
                100% 1050px, // focus
                100% 1250px, // immerse
                100% 1750px, // plan
                100% 2350px, // build
                100% 2100px, // stabilize
                100% 1900px, // optimize
                100% 1150px, // harvest
                100% 1450px; // retier
            background-image:
                url(${explore}),
                url(${focus}),
                url(${immerse}),
                url(${plan}),
                url(${build}),
                url(${stabilize}),
                url(${optimize}),
                url(${harvest}),
                url(${retier});
    `
    

    
        return (
            <Layout>
                <div key={this.state.windowWidth} style={style.row}  >
                    <div style={style.left} >
                        <FlowChartWithState config={{ readonly: true }} Components={{
                            NodeInner: NodeInnerCustom,
                            CanvasOuter: CanvasOuterCustom,
                            CanvasInner: CanvasInnerCustom
                        }} initialValue={this.complexChart()} />
                    </div>
                    <div style={style.right}>
                        <div style={style.contentExplore}>
                            <span style={style.text}>Explore</span>
                        </div>
                        <div style={style.contentFocus}>
                            <span style={style.text}>Focus</span>
                        </div>
                        <div style={style.contentImmerse}>
                            <span style={style.text}>Immerse</span>
                        </div>
                        <div style={style.contentPlan}>
                            <span style={style.text}>Plan</span>
                        </div>
                        <div style={style.contentBuild}>
                            <span style={style.text}>Build</span>
                        </div>
                        <div style={style.contentStabilize}>
                            <span style={style.text}>Stabilize</span>
                        </div>
                        <div style={style.contentOptimize}>
                            <span style={style.text}>Optimize</span>
                        </div>
                        <div style={style.contentHarvest}>
                            <span style={style.text}>Harvest</span>
                        </div>
                        <div style={style.contentRetier}>
                            <span style={style.text}>Retier</span>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}

