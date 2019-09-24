import React from 'react';
import Layout from '../../components/Layout';
import { FlowChartWithState } from "@mrblenny/react-flow-chart";
import data from "./data.json";
import { Helmet } from 'react-helmet';
import './canvas.css'
import * as print from './print.css'
import { CanvasInnerCustom, Outer, CanvasOuterCustom } from '../../components/styleComponents';
import { isMobile } from 'react-device-detect';
import ReactToPrint from 'react-to-print';

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
        rotateClassName: 'Vertical',
        rotateButtonName: 'vertical-button',
        rotateClass: 'notRotate',
        fliped: false
    }

    handleResize = () => {
        this.setState({
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
            shouldRender: window.innerHeight * window.innerWidth
        });
    };

    handlePrintBefore = async () => {
        let x = await new Promise((res, _rej) => {
            this.setState({
                windowWidth: 1920,
                windowHeight: 1440,
            }, () => {
                res(true);
            });
        })
        return x;
    };

    handleAfterPrint = async () => {
        let x = await new Promise((res, _rej) => {
            this.setState({
                windowWidth: window.innerWidth,
                windowHeight: window.innerHeight,
            }, () => {
                res(true);
            });
        })
        return x;
    }

    componentDidMount() {
        this.handleResize();
        this.handlePrintBefore();
        this.handleAfterPrint();
        window.addEventListener('resize', this.handleResize);
        window.addEventListener('beforeprint', this.handlePrintBefore);
        window.addEventListener('afterprint', this.handleAfterPrint);
    }

    componentWillUnmount() {
        window.removeEventListener('beforeprint', this.handlePrintBefore);
        window.removeEventListener('afterprint', this.handleAfterPrint);
        window.removeEventListener('resize', this.handleResize);
    }

    shouldComponentUpdate(_nextProps, nextState) {
        if (isMobile && this.state.windowWidth === nextState.windowHeight) {
            return false;
        }
        if (this.state.fliped !== nextState.fliped) {
            return true;
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
                return this.state.windowWidth > 800 ? ((((this.state.windowWidth - 100) * 0.25) - 200) / 2) : 0 ;
            case '2-marketSense':
                return this.state.windowWidth > 800 ? (((this.state.windowWidth - 100) * 0.25) + ((((this.state.windowWidth - 100) * 0.25) - 200) / 2)) : 200 ;
            case '3-technologyExcellence':
                return this.state.windowWidth > 800 ? (((this.state.windowWidth - 100) * 0.5) + ((((this.state.windowWidth - 100) * 0.25) - 200) / 2)) : 400;
            case '4-customerSuccess':
                return this.state.windowWidth > 800 ? (((this.state.windowWidth - 100) * 0.75) + ((((this.state.windowWidth - 100) * 0.25) - 200) / 2)) : 600;
            default:
                return 0;
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
                return 0;
        }
    }

    onBeforeGetContent = () => {
        return new Promise((res, _rej) => {
            this.setState({
                windowWidth: 1920,
                windowHeight: 1440,
                shouldRender: 1920 * 1449
            }, () => {
                res(true)
            })
        });
    }

    complexChart = () => {
        nodes.sort((current, next) => (current.group > next.group) ? 1 : (current.group === next.group) ? ((current.type > next.type) ? 1 : ((current.order > next.order) ? 1 : -1)) : -1);

        nodes.map((node) => {

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
                    x: this.xPos(node.type),
                    y: (node.order - 1) * 150 + pos.y
                },
                ports: ports
            };

            bigNode[`${node.id}`] = singleNode;

            // link structure
            node.to.map((link) => {
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
                y: 70
            },
            nodes: bigNode,
            links: allLinks,
            selected: {},
            hovered: {}
        }
    }

    onClicked = () => {
        this.setState({
            fliped: !this.state.fliped,
            rotateClass: this.state.fliped ? "notRotate" : "rotateDiv",
            rotateClassName: this.state.fliped ? "Vertical" : "Horizontal",
            rotateButtonName: this.state.fliped ? "vertical-button" : "horizontal-button"
        });
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
                width: `${this.state.windowWidth > 800 ? this.state.windowWidth - 100 : 800 }px`
            },
            right: {
                width: '100px'
            },
            userExpireence: {
                backgroundColor: 'rgb(255, 171, 64)',
                width: '33%',
                color: 'white',
                height: '80px',
                lineHeight: '80px',
                fontSize: '20px'
            },
            marketSense: {
                backgroundColor: 'rgb(142, 124, 195)',
                width: '33%',
                color: 'white',
                height: '80px',
                lineHeight: '80px',
                fontSize: '20px'
            },
            technologyExcellence: {
                backgroundColor: 'rgb(106, 168, 79)',
                width: '33%',
                color: 'white',
                height: '80px',
                lineHeight: '80px',
                fontSize: '20px'
            },
            customerSuccess: {
                backgroundColor: 'rgb(109, 158, 235)',
                width: '33%',
                color: 'white',
                height: '80px',
                lineHeight: '80px',
                fontSize: '20px'
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
                color: '#333333b0',
                textOrientation: "mixed",
                fontFamily: "sans-serif",
                fontSize: "60px",
                fontWeight: "600",
                position: "relative",
                top: "50%",
                transform: "translateY(-50%)"
            },
            tags: {
                display: 'flex',
                textAlign: 'center'
            }
        }
        return (
            <Layout>
                <div>
                    <Helmet>
                        <meta name="viewport" content="width=device-width, initial-scale=0.1, shrink-to-fit=no" />
                    </Helmet>
                </div>
                <div>
                    <div className="buttonBox hide">
                        <div className="button-container leftAlign">
                            <div className="hide textAlign">
                                <button className={this.state.rotateButtonName} onClick={this.onClicked}>{this.state.rotateClassName}</button>
                            </div>
                        </div>
                        <ReactToPrint
                            trigger={() => <div className="button-container rightAlign">
                                <div className="hide textAlign">
                                    <button onClick={this.awaitTillPrint} className="front-button">Print</button>
                                </div>
                            </div>}
                            content={() => this.componentRef}
                            pageStyle={print}
                            onBeforeGetContent={this.onBeforeGetContent}
                        />
                    </div>
                    <div className={this.state.rotateClass}>
                        <div className="background" ref={el => (this.componentRef = el)}>
                            <div className="toggleColor printHelper">
                                <div key={this.state.shouldRender} style={style.row}  >
                                    <div style={style.left} >
                                        <div className="zoomCanvas" style={style.tags}>
                                            <div className="canvasFont" style={style.userExpireence}>User Experience</div>
                                            <div className="canvasFont" style={style.marketSense}>Market Sense</div>
                                            <div className="canvasFont" style={style.technologyExcellence}>Technology Excellence</div>
                                            <div className="canvasFont" style={style.customerSuccess}>Customer Success</div>
                                        </div>
                                        <div>
                                            <FlowChartWithState config={{ readonly: true }} Components={{
                                                NodeInner: NodeInnerCustom,
                                                CanvasOuter: CanvasOuterCustom,
                                                CanvasInner: CanvasInnerCustom
                                            }} initialValue={this.complexChart()} />
                                        </div>
                                    </div>
                                    <div className="textCanvas" style={style.right}>
                                        <div className='contentExplore'>
                                            <span style={style.text}>Explore</span>
                                        </div>
                                        <div className='contentFocus'>
                                            <span style={style.text}>Focus</span>
                                        </div>
                                        <div className='contentImmerse'>
                                            <span style={style.text}>Immerse</span>
                                        </div>
                                        <div className='contentPlan'>
                                            <span style={style.text}>Plan</span>
                                        </div>
                                        <div className='contentBuild'>
                                            <span style={style.text}>Build</span>
                                        </div>
                                        <div className='contentStabilize'>
                                            <span style={style.text}>Stabilize</span>
                                        </div>
                                        <div className='contentOptimize'>
                                            <span style={style.text}>Optimize</span>
                                        </div>
                                        <div className='contentHarvest'>
                                            <span style={style.text}>Harvest</span>
                                        </div>
                                        <div className='contentRetier'>
                                            <span style={style.text}  >Retier</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}

