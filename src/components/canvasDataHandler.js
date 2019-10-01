import Build from '../pages/canvas/data/Build.json';
import Explore from '../pages/canvas/data/Explore.json';
import Focus from '../pages/canvas/data/Focus.json';
import Harvest from '../pages/canvas/data/Harvest.json';
import Immerse from '../pages/canvas/data/Immerse.json';
import Optimize from '../pages/canvas/data/Optimize.json';
import Plan from '../pages/canvas/data/Plan.json';
import Retier from '../pages/canvas/data/Retier.json';
import Stabilize from '../pages/canvas/data/Stabilize.json';

let nodes = [];
Build.nodes.map( node=> nodes.push(node) );
Explore.nodes.map( node => nodes.push(node));
Focus.nodes.map( node => nodes.push(node));
Harvest.nodes.map( node => nodes.push(node));
Immerse.nodes.map( node => nodes.push(node));
Optimize.nodes.map( node => nodes.push(node));
Plan.nodes.map( node => nodes.push(node));
Retier.nodes.map( node => nodes.push(node));
Stabilize.nodes.map( node => nodes.push(node));

export default nodes;