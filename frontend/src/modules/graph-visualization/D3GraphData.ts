
import * as d3Force from 'd3-force';

export enum NodeType {
    None = "None",
    D3ModuleNode ="D3ModuleNode",
    D3SkillNode = "D3SkillNode",
    D3CapabilityNode = "D3CapabilityNode"
}

export class D3Node implements d3Force.SimulationNodeDatum {
    index?: number | undefined;
    x?: number | undefined;
    y?: number | undefined;
    vx?: number | undefined;
    vy?: number | undefined;
    fx?: number | null | undefined;
    fy?: number | null | undefined;

    constructor(
        public id: string,
        public name: string,
        public group: number,
        public type: NodeType = NodeType.None,
        x?, y?) {
        this.x = x;
        this.y = y;
    }
}

export class D3ModuleNode extends D3Node {
    constructor(id: string, name: string) {
        super(id, name, 1, NodeType.D3ModuleNode);
    }
}
export class D3SkillNode extends D3Node{
    constructor(id: string, name: string) {
        super(id, name, 100, NodeType.D3SkillNode);
    }
}

export class D3CapabilityNode extends D3Node{
    constructor(id: string, name: string) {
        super(id, name, 200, NodeType.D3CapabilityNode);
    }
}

export class D3Link implements d3Force.SimulationLinkDatum<D3Node> {
    constructor(
        public source: D3Node,
        public target: D3Node,
        public type: string) { }
}


export class D3GraphData {
    constructor(private nodes: D3Node[] = [], private links: D3Link[] = []) { }

    addNode(node: D3Node): void {
        this.nodes.push(node);
    }

    addLink(link: D3Link): void {
        this.links.push(link);
    }

    getNodes(): D3Node[] {return this.nodes;}
    getLinks(): D3Link[] {return this.links;}

    getNodesById(id: string): D3Node[] {
        return this.nodes.filter(node => node.id == id);
    }

    getNodesByNodeTyp(type: string): D3Node[] {
        return this.nodes.filter(node => node.type === type);
    }


    // Adds another D3GraphData object to the current one
    appendAndConnectData(data: D3GraphData, idToConnectTo: string, nodeType: NodeType, connectionType: string): void {
        const newNodes = data.getNodes();
        const newLinks = data.getLinks();
        // Add the new data
        newNodes.forEach(newNode => this.addNode(newNode));
        newLinks.forEach(newLink => this.addLink(newLink));
        // Connect with existing nodes
        const oldNodesToConnect = this.getNodesById(idToConnectTo);
        const newNodesToConnect = this.getNodesByNodeTyp(nodeType);

        oldNodesToConnect.forEach(oldNode => {
            newNodesToConnect.forEach(newNode => {
                this.addLink(new D3Link(oldNode, newNode, connectionType));
            });
        });
    }
}
