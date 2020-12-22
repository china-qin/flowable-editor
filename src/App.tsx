import React, {useEffect, useRef} from 'react';
import './App.css';
import {Addon, Edge, Graph} from "@antv/x6";
import './config/ShapConfig'
import {endNode, startNode, switchNode, taskNode} from "./stencil/StencilShap";

const edgeTest = {
    shape: 'double-edge',
    attrs: {
        line: {
            stroke: '#7c68fc',
        },
    },
}

function App() {
    const graphContainer: any = useRef<HTMLDivElement>(null);
    const stencilContainer: any = useRef<HTMLDivElement>(null);
    const minimapContainer: any = useRef<HTMLDivElement>(null)
    const magnetAvailabilityHighlighter = {
        name: 'stroke',
        args: {
            padding: 3,
            attrs: {
                strokeWidth: 3,
                stroke: '#52c41a',
            },
        },
    }
    let graph: Graph;
    useEffect(() => {
        if (!graph) {
            graph = new Graph({
                container: graphContainer.current,
                selecting: {
                    enabled: true,
                    showNodeSelectionBox: true,
                    showEdgeSelectionBox: true,
                },
                snapline: {
                    enabled: true,
                    sharp: true,
                },
                highlighting: {
                    magnetAvailable: magnetAvailabilityHighlighter,
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
                    padding: 1,
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
                    createEdge(this,{
                                   sourceCell,
                                   sourceView,
                                   sourceMagnet
                               }){
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
        }
    });
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
                right: 2,
                zIndex: 99,
            }}/>
        </>
    );
}

export default App;
