import React from "react";
import Layout from "../../components/Layout";
import { Helmet } from "react-helmet";
import "./canvas.css";
import { isMobile } from "react-device-detect";
import ReactToPrint from "react-to-print";
import SideCanvas from "../../components/canvasSideLine";
import Canvas from "../../components/Canvas";
import CanvasHeadBar from "../../components/CanvasHeadBar";
import Aux from "../../components/hocAux";
import types from "./types.json";
import { graphql, StaticQuery } from 'gatsby';

let nodes = [];
let singleNode = {};
let allLinks = {};
let bigNode = {};
let linkCount = 0;

const color = types.color;

let typeCount = {};
let gapBetween = [];
let boundaries = [];

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

    // resize the view acording to window width and height
    handleResize = () => {
        this.setState({
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
            shouldRender: window.innerHeight * window.innerWidth
        });
    };

    // set window for fixed size 
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
    }

    componentWillUnmount() {
        window.removeEventListener("beforeprint", this.handlePrintBefore);
        window.removeEventListener("afterprint", this.handleAfterPrint);
        window.removeEventListener("resize", this.handleResize);
    }

    shouldComponentUpdate(_nextProps, nextState) {
        // if mobile dont change the rendering , in zoomin and zoomout
        if (isMobile && this.state.windowHeight === nextState.windowHeight) {
            return false;
        }
        // check either state in vertical or horizontal
        if (this.state.fliped !== nextState.fliped) {
            return true;
        }
        // check it the window size dosent change so , it should not render
        if (this.state.shouldRender === nextState.shouldRender) {
            return false;
        }
        return true;
    }

    // x posision of each chart node
    // limited to min width 800px
    // after 800px it wont change if you minimize the window
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

    // on before the print happen (using print button)
    // make window size fixed
    // zoom out for a a4 size then print
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

    // a polyfil for es9 feature Object.fromEntries
    formEntries = (iterable) => {
        return [...iterable].reduce((obj, [key, val]) => {
            obj[key] = val
            return obj
        }, {})
    }

    // the graph genarator 
    complexChart = (edges) => {
        let directoryNames = [];
        typeCount = [];
        nodes = []

        // push each data from json files to nodes array
        // push each titles of json files to directoryNames
        edges.map((nodesX) => {
            directoryNames.push(nodesX.node.title)
            nodesX.node.nodes.map(node => {
                nodes.push(node);
                return true;
            })
            return true;
        });

        // sort the nodes , and directory names
        directoryNames.sort();
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

        // get the no of similar nodes in each directory
        // ex -> 1-explore has 5 nodes
        nodes.map(node => {
            typeCount[node.group.split('-')[0] - 1] = (typeCount[node.group.split('-')[0] - 1] + 150) || 150;
            return true;
        })

        // calculate the hight of each directory 
        typeCount.reduce((acc, curentVal, i) => {
                gapBetween[i] = acc;
            return acc + curentVal;
        }, 0);

        // update types and its count to object array
        typeCount = this.formEntries(directoryNames.map((_, i) => [directoryNames[i].split('-')[1], typeCount[i]]));

        // update the boundaries to an object array
        boundaries = this.formEntries(directoryNames.map((_, i) => [directoryNames[i].split('-')[1], gapBetween[i]]));

        // genarating the main structure of the graph
        nodes.map(node => {
            // node structure
            // get color schema for each node by its node type
            let colorType = color[node.type];

            // get the y position of each node
            let pos = boundaries[node.group.split('-')[1]] - boundaries[directoryNames[0].split('-')[1]];
            let ports = {};

            // 1st port 
            let out = {
                port1: {
                    id: "port1",
                    type: "output"
                }
            };
            ports = Object.assign(ports, out);

            // 2nd port
            let input = {
                port2: {
                    id: "port2",
                    type: "input"
                }
            };

            // add ports 
            ports = Object.assign(ports, input);

            // making a structure of a single node acording to react-flow-chart
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

            // add all nodes to a single array of bigNode
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
                // add all links to allLinks
                allLinks[`link${linkCount}`] = linkd;
                return true;
            });
            return true;
        });

        // complete graph node structure 
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

    // trigger when vertical | horizontal button clicked
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

    // set background filtering lines according to directory hight
    getBackgroundFilter = (edge) => {
        let directoryNames = [];
        edge.map((nodesX) => {
            directoryNames.push(nodesX.node.title);
            return true;
        });
        directoryNames.sort();
        // this is a css style that genarate dynamixcly acording to the width of directories
        let backgroundString = 'linear-gradient(180deg';
        directoryNames.map((type, i) => {
            if (i === 0) {
                return true;
            }
            let value = boundaries[type.split('-')[1]] + 150;
            backgroundString = backgroundString.concat(`, #fff ${value}px , #f3f3f3 ${value}px`);
            return true;
        });
        backgroundString = backgroundString.concat(')');
        return backgroundString;
    };

    render() {
        const { edges } = this.props.data.allDataJson;
        let style = {
            left: {
                width: `${
                    this.state.windowWidth > 800 ? this.state.windowWidth - 100 : 800
                    }px`
            },
            background: {
                background: this.getBackgroundFilter(this.props.data.allDataJson.edges)
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
                                onBeforeGetContent={this.onBeforeGetContent}
                            />
                        </div>
                    )}
                    <div className={this.state.rotateClass}>
                        <div className="toggleZoom" style={style.background} ref={el => (this.componentRef = el)}>
                            <div className='printHelper'>
                                <div key={this.state.shouldRender} className="row">
                                    <div style={style.left}>
                                    <Aux>
                                        <CanvasHeadBar />
                                        <Canvas complexChart={this.complexChart(edges)} />
                                    </Aux>
                                    </div>
                                    <div className="right">
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

// get all the json files from canvas/data
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