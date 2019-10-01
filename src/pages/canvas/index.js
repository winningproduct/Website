import React from "react";
import Layout from "../../components/Layout";
import { Helmet } from "react-helmet";
import "./canvas.css";
import * as print from "./print.css";
import { isMobile } from "react-device-detect";
import ReactToPrint from "react-to-print";
import SideCanvas from "../../components/canvasSideLine";
import Canvas from "../../components/Canvas";
import types from "./types.json";
import CanvasHeadBar from "../../components/CanvasHeadBar";
import Aux from "../../components/hocAux";
import { graphql, StaticQuery } from 'gatsby'

let nodes = []
let singleNode = {};
let allLinks = {};
let bigNode = {};
let linkCount = 0;

const color = types.color;
const type = types.type;

let typeCount = {};
let gapBetween = [];
let boundaries = []

class CanvasIndexPage extends React.Component {

    state = {
        windowWidth: 1920,
        windowHeight: 1440,
        shouldRender: 1,
        rotateClassName: "Vertical",
        rotateButtonName: "vertical-button",
        rotateClass: "notRotate",
        fliped: false
    };

    handleResize = () => {
        this.setState({
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
            shouldRender: window.innerHeight * window.innerWidth
        });
    };

    handlePrintBefore = async () => {
        return new Promise((res, _rej) => {
            this.setState(
                {
                    windowWidth: 1920,
                    windowHeight: 1440
                },
                () => {
                    res(true);
                }
            );
        });
    };

    handleAfterPrint = async () => {
        await new Promise((res, _rej) => {
            this.setState(
                {
                    windowWidth: window.innerWidth,
                    windowHeight: window.innerHeight
                },
                () => {
                    res(true);
                }
            );
        });
    };

    componentDidMount() {
        this.handleResize();
        this.handlePrintBefore();
        this.handleAfterPrint();
        window.addEventListener("resize", this.handleResize);
        window.addEventListener("beforeprint", this.handlePrintBefore);
        window.addEventListener("afterprint", this.handleAfterPrint);
        document.getElementById('backGround').style.setProperty('background', this.getBackgroundFilter(this.props.data.allDataJson.edges));

    }

    componentWillUnmount() {
        window.removeEventListener("beforeprint", this.handlePrintBefore);
        window.removeEventListener("afterprint", this.handleAfterPrint);
        window.removeEventListener("resize", this.handleResize);
    }

    shouldComponentUpdate(_nextProps, nextState) {
        if (isMobile && this.state.windowHeight === nextState.windowHeight) {
            return false;
        }
        if (this.state.fliped !== nextState.fliped) {
            return true;
        }
        if (this.state.shouldRender === nextState.shouldRender) {
            return false;
        }
        return true;
    }

    xPos = type => {
        switch (type) {
            case "userExperience":
                return this.state.windowWidth > 800
                    ? ((this.state.windowWidth - 100) * 0.25 - 200) / 2
                    : 0;
            case "marketSense":
                return this.state.windowWidth > 800
                    ? (this.state.windowWidth - 100) * 0.25 +
                    ((this.state.windowWidth - 100) * 0.25 - 200) / 2
                    : 200;
            case "technologyExcellence":
                return this.state.windowWidth > 800
                    ? (this.state.windowWidth - 100) * 0.5 +
                    ((this.state.windowWidth - 100) * 0.25 - 200) / 2
                    : 400;
            case "customerSuccess":
                return this.state.windowWidth > 800
                    ? (this.state.windowWidth - 100) * 0.75 +
                    ((this.state.windowWidth - 100) * 0.25 - 200) / 2
                    : 600;
            default:
                return 0;
        }
    };

    onBeforeGetContent = () => {
        return new Promise((res, _rej) => {
            this.setState(
                {
                    windowWidth: 1920,
                    windowHeight: 1440,
                    shouldRender: 1920 * 1449
                },
                () => {
                    res(true);
                }
            );
        });
    };

    formEntries = (iterable) => {
        return [...iterable].reduce((obj, [key, val]) => {
            obj[key] = val
            return obj
        }, {})
    }

    complexChart = (edges) => {
        nodes = []
        edges.map((nodesX) => {
            nodesX.node.nodes.map(node => {
                nodes.push(node);
            })
        });
        typeCount = [];
        nodes.sort((current, next) =>
            current.group > next.group
                ? 1
                : current.group === next.group
                    ? current.type > next.type
                        ? 1
                        : current.order > next.order
                            ? 1
                            : -1
                    : -1
        );

        nodes.map(node => {
            typeCount[node.group.split('-')[0] - 1] = (typeCount[node.group.split('-')[0] - 1] + 150) || 150;

        })

        typeCount.reduce((acc, curentVal, i) => {
            if (i === 0) {
                gapBetween[i] = acc;
            } else {
                gapBetween[i] = acc + 50;
            }
            return acc + curentVal;
        }, 0);

        typeCount = this.formEntries(type.map((_, i) => [type[i], typeCount[i]]));

        boundaries = this.formEntries(type.map((_, i) => [type[i], gapBetween[i]]));

        nodes.map(node => {
            // node structure
            let colorType = color[node.type];
            let pos = boundaries[node.group.split('-')[1]] - boundaries[type[0]];
            let ports = {};

            let out = {
                port1: {
                    id: "port1",
                    type: "output"
                }
            };
            ports = Object.assign(ports, out);

            let input = {
                port2: {
                    id: "port2",
                    type: "input"
                }
            };
            ports = Object.assign(ports, input);

            singleNode = {
                id: node.id,
                title: node.title,
                color: colorType,
                type: "default",
                url: node.url,
                position: {
                    x: this.xPos(node.type.split('-')[1]),
                    y: (node.order - 1) * 150 + pos
                },
                ports: ports
            };

            bigNode[`${node.id}`] = singleNode;

            // link structure
            node.to.map(link => {
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
                };
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
        };
    };

    onClicked = () => {
        this.setState({
            fliped: !this.state.fliped,
            rotateClass: this.state.fliped ? "notRotate" : "rotateDiv",
            rotateClassName: this.state.fliped ? "Vertical" : "Horizontal",
            rotateButtonName: this.state.fliped
                ? "vertical-button"
                : "horizontal-button"
        });
    };

    getBackgroundFilter = (edge) => {
        let directoryNames = [];
        edge.map((nodesX) => {
            directoryNames.push(nodesX.node.title)
        });
        directoryNames.sort();
        let s = 'linear-gradient(180deg';
        directoryNames.map((type, i) => {
            if (i === 0) {
                return true;
            }
            let value = boundaries[type.split('-')[1]] + 150;
            s = s.concat(`, #fff ${value}px , #f3f3f3 ${value}px`);
        });
        s = s.concat(')');
        return s;
    }

    render() {
        const { edges } = this.props.data.allDataJson;
        let style = {
            left: {
                width: `${
                    this.state.windowWidth > 800 ? this.state.windowWidth - 100 : 800
                    }px`
            }
        };

        return (
            <Layout>
                <div>
                    <Helmet>
                        <meta
                            name="viewport"
                            content="width=device-width, initial-scale=0.1, shrink-to-fit=no"
                        />
                    </Helmet>
                </div>
                <div>
                    {isMobile ? null : (
                        <div className="buttonBox hide">
                            <div className="button-container leftAlign">
                                <div className="hide textAlign">
                                    <button
                                        className={this.state.rotateButtonName}
                                        onClick={this.onClicked}
                                    >
                                        {this.state.rotateClassName}
                                    </button>
                                </div>
                            </div>
                            <ReactToPrint
                                trigger={() => (
                                    <div className="button-container rightAlign">
                                        <div className="hide textAlign">
                                            <button
                                                onClick={this.awaitTillPrint}
                                                className="front-button"
                                            >
                                                Print
                                            </button>
                                        </div>
                                    </div>
                                )}
                                content={() => this.componentRef}
                                pageStyle={print}
                                onBeforeGetContent={this.onBeforeGetContent}
                            />
                        </div>
                    )}
                    <div className={this.state.rotateClass}>
                        <div id="backGround" ref={el => (this.componentRef = el)}>
                            <div className="toggleColor printHelper">
                                <div key={this.state.shouldRender} className="row">
                                    <div style={style.left}>
                                        <CanvasHeadBar />
                                        <Aux>
                                            <Canvas complexChart={this.complexChart(edges)} />
                                        </Aux>
                                    </div>
                                    <div className="textCanvas" className="right">
                                        <Aux>
                                            <SideCanvas sidelineHeight={typeCount} directory={edges} />
                                        </Aux>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        );

    }
}

export default () => (
    <StaticQuery
        query={graphql`
      query canvasDataQuery {
        allDataJson {
            edges {
                node {
                nodes {
                    group
                    id
                    order
                    to
                    type
                    url
                }
                title
            }
        }
    }
}
      `}
        render={(data) => <CanvasIndexPage data={data} />}
    />
)