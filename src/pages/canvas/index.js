import React from 'react';
import Layout from '../../components/Layout';
import { FlowChartWithState } from "@mrblenny/react-flow-chart";
import data from "./data.json";
import { Helmet } from 'react-helmet';
import * as print from './print.css';
import './canvas.css'
import { CanvasInnerCustom, Outer, CanvasOuterCustom } from '../../components/styleComponents';
import ReactToPrint from 'react-to-print';
import { isMobile } from 'react-device-detect';

let nodes = data.nodes;
let singleNode = {}
let allLinks = {}
let bigNode = {};
let linkCount = 0;

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
export default class CanvasIndexPage extends React.Component {
    state = {
        windowWidth: 1920,
        windowHeight: 1440,
        shouldRender: 1,
        mobileCount: 0
    }

    handleResize = () => {
        this.setState({
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
            shouldRender: window.innerHeight * window.innerWidth
        });
    };

    componentDidMount() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
    }

    shouldComponentUpdate(_nextProps, nextState) {
        if ( isMobile && this.state.windowWidth === nextState.windowHeight) {
            return false;
        }
        if (this.state.shouldRender === nextState.shouldRender) {
            return false;
        }
        return true
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
                return this.state.windowWidth > 600 ? this.state.windowWidth * 0.1 : 100;
            case '4-customerSuccess':
                return this.state.windowWidth > 600 ? this.state.windowWidth * 0.3 : 150;
            case '3-technologyExcellence':
                return this.state.windowWidth > 600 ? this.state.windowWidth * 0.5 : 200;
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
                x: this.state.windowWidth > 600 ? this.state.windowWidth * 0.1 : 0,
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
            path: {
                stroke: "black !important"
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
                height: "1050px",
                textAlign: "center"
            },
            contentImmerse: {
                height: "1200px",
                textAlign: "center"
            },
            contentPlan: {
                height: "1650px",
                textAlign: "center"
            },
            contentBuild: {
                height: "2250px",
                textAlign: "center"
            },
            contentStabilize: {
                height: "1950px",
                textAlign: "center"
            },
            contentOptimize: {
                height: "1800px",
                textAlign: "center"
            },
            contentHarvest: {
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
                fontSize: this.state.windowWidth > 600 ? this.state.windowWidth * 0.2 * 0.25 : "60px",
                fontWeight: "600",
                position: "relative",
                top: "50%",
                transform: "translateY(-50%)"
            }
        }
        return (
            <Layout>
                <div>
                    <Helmet>
                        <meta name="viewport" content="width=device-width, initial-scale=0.1, shrink-to-fit=no" />
                    </Helmet>
                </div>
                <div className="background" ref={el => (this.componentRef = el)}>
                <div className="toggleColor">
                    <div key={this.state.shouldRender} style={style.row}  >
                        <div style={style.left} >
                            <FlowChartWithState config={{ readonly: true }} Components={{
                                NodeInner: NodeInnerCustom,
                                CanvasOuter: CanvasOuterCustom,
                                CanvasInner: CanvasInnerCustom
                            }} initialValue={this.complexChart()} />
                        </div>
                        <div style={style.right}>
                            <ReactToPrint
                                trigger={() => <div className="button-container">
                                    <div className="button-flipper hide">
                                        <button className="front-button">Print</button>
                                        <button className="back-button">Print</button>
                                    </div>
                                </div>}
                                content={() => this.componentRef}
                                pageStyle={print}
                            />

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
                    </div>
                </div>
            </Layout>
        )
    }
}

