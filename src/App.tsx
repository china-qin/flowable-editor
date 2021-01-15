import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import 'antd/dist/antd.css';
import {Addon, Graph} from "@antv/x6";
import './config/ShapConfig'
import {
    edgeCommon,
    edgeSwitch,
    endNode,
    groupNode, groupNode001,
    groupNode002,
    startNode,
    switchNode,
    taskNode
} from "./stencil/StencilShap";
import PropertyNode from "./Property/PropertyNode";

const App: React.FC = () => {
    const [nodeVisible, setNodeVisible] = useState(false);
    const graphContainer: any = useRef<HTMLDivElement>(null);
    const stencilContainer: any = useRef<HTMLDivElement>(null);
    const minimapContainer: any = useRef<HTMLDivElement>(null);

    let ctrlPressed = false;
    const embedPadding = 30
    let graph: Graph;
    useEffect(() => {
        console.log("init graph")
        graph = new Graph({
            container: graphContainer.current,
            selecting: {
                enabled: true,
            },
            snapline: {
                enabled: true,
                sharp: true,
            },
            keyboard: true,
            embedding: {
                enabled: true,
                validate(this, {
                    child,
                    parent,
                    childView,
                    parentView
                }) {
                    if (child.shape === 'rect-headered') {
                        return false
                    }
                    return parent.shape === 'rect-headered';
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
                embedding: {
                    name: 'stroke',
                    args: {
                        padding: -1,
                        attrs: {
                            stroke: '#73d13d',
                        },
                    },
                },
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
                    switch (sourceCell.shape) {
                        case 'polygon':
                            return this.addEdge(edgeSwitch)
                        default:
                            return this.addEdge(edgeCommon)
                    }
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
                    return !(!targetMagnet ||
                        targetMagnet.getAttribute('port-group') !== 'in');

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
                    graphWidth: 200,
                    graphHeight: 250,
                },
            ],
        });
        stencilContainer.current.appendChild(stencil.container);
        stencil.load([startNode, endNode], '事件')
        stencil.load([taskNode], '活动')
        stencil.load([switchNode], '网关')
        stencil.load([groupNode001, groupNode002, groupNode], '泳道')

        graph.on('cell:click', ({cell}) => {
            if (cell.isNode()) {
                if (cell.shape === 'rect-headered') {
                    const headText = cell.getAttrByPath('headerText/text')
                    if (headText === '001' || headText === '002') {
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
                    } else {
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
                                    x: - 10,
                                    y: 40,
                                    onClick({view}: any) {
                                        setNodeVisible(true);
                                    },
                                },
                            }
                        ])
                    }
                }
                if (cell.shape === 'rect') {
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
                                onClick({view}: any) {
                                    setNodeVisible(true);
                                },
                            },
                        }
                    ])
                }
                if (cell.shape === 'circle' || cell.shape === 'polygon') {

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
                switch (cell.shape) {
                    case 'edge':
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
                        break;
                    case 'double-edge':
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
                            'target-arrowhead',
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
                                    x: 40,
                                    y: 40,
                                    onClick({view}: any) {
                                        setNodeVisible(true);
                                    },
                                },
                            }
                        ])
                        break;
                }
            }
            console.log(JSON.stringify(graph.toJSON()))
        })
        graph.on('cell:unselected', ({cell}) => {
            cell.removeTools()
        })
        graph.on('node:added', ({node, index, options}) => {
            if (node.shape === 'rect-headered') {
                node.resize(360, 160, {direction: 'bottom-right'});
                node.setZIndex(-1)
            }
            if(node.shape === 'circle') {
                graph.getNodes().forEach(s => {
                    if (node !== s) {
                        if (s.shape === 'circle') {
                            const sTxt = s.getAttrByPath('text/text')
                            const nTxt = node.getAttrByPath('text/text')
                            if(sTxt === nTxt){
                                node.remove()
                            }
                        }
                    }
                })
            }
        })
        graph.on('node:embedding', ({e}) => {
            ctrlPressed = e.metaKey || e.ctrlKey
        })
        graph.on('node:embedded', () => {
            ctrlPressed = false
        })
        graph.on('node:change:size', ({node, options}) => {
            if (options.skipParentHandler) {
                return
            }

            const children = node.getChildren()
            if (children && children.length) {
                node.prop('originSize', node.getSize())
            }
        })
        graph.on('node:change:position', ({node, options}) => {
            if (options.skipParentHandler || ctrlPressed) {
                return
            }

            const children = node.getChildren()
            if (children && children.length) {
                node.prop('originPosition', node.getPosition())
            }

            const parent = node.getParent()
            if (parent && parent.isNode()) {
                let originSize = parent.prop('originSize')
                if (originSize == null) {
                    originSize = parent.getSize()
                    parent.prop('originSize', originSize)
                }

                let originPosition = parent.prop('originPosition')
                if (originPosition == null) {
                    originPosition = parent.getPosition()
                    parent.prop('originPosition', originPosition)
                }

                let x = originPosition.x
                let y = originPosition.y
                let cornerX = originPosition.x + originSize.width
                let cornerY = originPosition.y + originSize.height
                let hasChange = false

                const children = parent.getChildren()
                if (children) {
                    children.forEach((child) => {
                        const bbox = child.getBBox().inflate(embedPadding)
                        const corner = bbox.getCorner()

                        if (bbox.x < x) {
                            x = bbox.x
                            hasChange = true
                        }

                        if (bbox.y < y) {
                            y = bbox.y
                            hasChange = true
                        }

                        if (corner.x > cornerX) {
                            cornerX = corner.x
                            hasChange = true
                        }

                        if (corner.y > cornerY) {
                            cornerY = corner.y
                            hasChange = true
                        }
                    })
                }

                if (hasChange) {
                    parent.prop(
                        {
                            position: {x, y},
                            size: {width: cornerX - x, height: cornerY - y},
                        },
                        {skipParentHandler: true},
                    )
                }
            }
        })

    }, []);

    const onNodeDrawerClose = () => {
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
            <PropertyNode iVisible={nodeVisible} onDrawerClose={onNodeDrawerClose}/>
        </>
    );
}

export default App;
