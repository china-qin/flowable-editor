import React, {useEffect, useRef} from 'react';
import {Edge, Graph} from "@antv/x6";


const edgeTest = {
    shape: 'double-edge',
    source: { x: 320, y: 100 },
    target: { x: 380, y: 260 },
    attrs: {
        line: {
            strokeWidth: 5,
            stroke: '#73d13d',
        },

    },
}

const Test = () => {
    const graphContainer: any = useRef<HTMLDivElement>(null);
    let graph: Graph;
    useEffect(() => {
        if (!graph) {
            graph = new Graph({
                container: graphContainer.current,
                grid: true,
            });
            graph.addEdge(edgeTest);
        }
    });
    return (
        <div ref={graphContainer} style={{
            width: '100%',
            height: '100vh'
        }}/>
    );

}
export default Test;