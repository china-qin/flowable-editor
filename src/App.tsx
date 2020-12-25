import React, {useEffect, useRef, useState} from 'react';
import './App.css';
// import 'antd/dist/antd.css';
import {Addon, Graph} from "@antv/x6";
import './config/ShapConfig'
import {endNode, startNode, switchNode, taskNode} from "./stencil/StencilShap";

const edgeTest = {
    shape: 'double-edge',
    attrs: {
        line: {
            stroke: '#7c68fc',
        },
    },
    connector: 'rounded',
    data:{
        gogo: '0000'
    }
}

const App:React.FC = () =>{
    const [nodeVisible,setNodeVisible] = useState(false);
    const graphContainer: any = useRef<HTMLDivElement>(null);
    const stencilContainer: any = useRef<HTMLDivElement>(null);
    const minimapContainer: any = useRef<HTMLDivElement>(null);

    let graph:Graph;
    useEffect(() => {

            console.log("init graph")
            graph = new Graph({
                container: graphContainer.current,
                selecting: {
                    enabled: true,
                    rubberband: true,
                    multiple: true,
                    strict: true,
                    showNodeSelectionBox: true,
                    showEdgeSelectionBox: true,
                    selectCellOnMoved: false,                },
                snapline: {
                    enabled: true,
                    sharp: true,
                },
                keyboard: true,
                highlighting: {
                    magnetAvailable: {
                        name: 'stroke',
                        args: {
                            padding: 3,
                            attrs: {
                                strokeWidth: 3,
                                stroke: '#4ff802',
                            },
                        },
                    },
                },
                grid: {
                    visible: true,
                },
                scroller: {
                    enabled: true,
                },
                minimap: {
                    enabled: true,
                    container: minimapContainer.current,
                    padding: 2,
                },
                mousewheel: {
                    enabled: true,
                    modifiers: ['ctrl', 'meta'],
                },

                connecting: {
                    dangling: false,
                    snap: {
                        radius: 50,
                    },
                    highlight: true,
                    router: 'metro',
                    createEdge(this, {
                        sourceCell,
                        sourceView,
                        sourceMagnet
                    }) {
                        return this.addEdge(edgeTest)
                    },
                    validateMagnet({magnet}) {
                        return magnet.getAttribute('port-group') !== 'in'
                    },
                    validateConnection({
                                           sourceView,
                                           sourceMagnet,
                                           targetView,
                                           targetMagnet,
                                       }) {
                        if (sourceView === targetView) {
                            return false
                        }
                        if (
                            !sourceMagnet ||
                            sourceMagnet.getAttribute('port-group') === 'in'
                        ) {
                            return false
                        }
                        if (
                            !targetMagnet ||
                            targetMagnet.getAttribute('port-group') !== 'in'
                        ) {
                            return false
                        }
                        return true
                    },
                },
            });

            graph.centerContent();

            const stencil = new Addon.Stencil({
                title: '工作流编辑器',
                target: graph,
                collapsable: true,
                stencilGraphOptions: {
                    grid: 1,
                },
                layoutOptions: {
                    columnWidth: 175,
                    columns: 1,
                    center: true,
                },
                groups: [
                    {
                        name: '事件',
                        graphWidth: 200,
                        graphHeight: 180,
                    },
                    {
                        name: '活动',
                        graphWidth: 200,
                        graphHeight: 100,
                    },
                    {
                        name: '网关',
                        graphWidth: 200,
                        graphHeight: 100,
                    },
                    {
                        name: '泳道',
                    },
                ],
            });
            stencilContainer.current.appendChild(stencil.container);
            stencil.load([startNode, endNode], '事件')
            stencil.load([taskNode], '活动')
            stencil.load([switchNode], '网关')

            graph.on('cell:click', ({cell}) => {
                if (cell.isNode()) {
                    console.log(cell.shape)
                    if(cell.shape == 'rect'){

                        cell.addTools([
                            {
                                name: 'boundary',
                                args: {
                                    attrs: {
                                        fill: '#7c68fc',
                                        stroke: '#333',
                                        'stroke-width': 1,
                                        'fill-opacity': 0.2,
                                    },
                                },
                            },
                            {
                                name: 'button-remove',
                                args: {
                                    offset: {x: -10, y: -10},
                                },
                            },
                            {
                                name: 'button',
                                args: {
                                    markup: [
                                        {
                                            tagName: 'rect',
                                            selector: 'button',
                                            attrs: {
                                                width: 40,
                                                height: 20,
                                                rx: 4,
                                                ry: 4,
                                                fill: 'whitesmoke',
                                                stroke: '#221611',
                                                'stroke-width': 2,
                                                cursor: 'pointer',
                                            },
                                        },
                                        {
                                            tagName: 'text',
                                            selector: 'text',
                                            textContent: '属性',
                                            attrs: {
                                                fill: '#blue',
                                                'font-size': 10,
                                                'text-anchor': 'middle',
                                                'pointer-events': 'none',
                                                x: 20,
                                                y: 13,
                                            },
                                        },
                                    ],
                                    x: -10,
                                    y: 40,
                                    onClick({ view }: any) {
                                        setNodeVisible(true);
                                    },
                                },
                            }
                        ])
                    }
                    if(cell.shape == 'circle'){

                        cell.addTools([
                            {
                                name: 'boundary',
                                args: {
                                    attrs: {
                                        fill: '#7c68fc',
                                        stroke: '#333',
                                        'stroke-width': 1,
                                        'fill-opacity': 0.2,
                                    },
                                },
                            },
                            {
                                name: 'button-remove',
                                args: {
                                    offset: {x: -10, y: -10},
                                },
                            },

                        ])
                    }
                }
                if (cell.isEdge()) {
                    console.log(cell.shape)
                    cell.addTools([

                        {
                            name: 'button-remove',
                            args: {
                                offset: {x: 15, y: 15},
                            },
                        },
                        'vertices',
                        'segments',
                        'source-arrowhead',
                        'target-arrowhead'
                    ])
                }
                console.log(JSON.stringify(graph.toJSON()))
            })
            graph.on('cell:unselected', ({cell}) => {
                cell.removeTools()
            })
    },[]);

    const onNodeDrawerClose=()=>{
        setNodeVisible(false)
    }

    return (
        <>
            <div ref={stencilContainer} style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: 200,
                height: '100vh',
            }}/>
            <div ref={graphContainer} style={{
                position: 'absolute',
                width: 'calc(100% - 200px)',
                left: '200px',
                height: '100vh'
            }}/>
            <div ref={minimapContainer} style={{
                position: 'absolute',
                width: 300,
                height: 200,
                top: 2,
                right: 30,
                zIndex: 99,
                // backgroundColor: 'whitesmoke'
            }}/>
            {/*<PropertyNode iVisible={nodeVisible} onDrawerClose={onNodeDrawerClose}/>*/}
        </>
    );
}

export default App;
