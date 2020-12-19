import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import {Addon, Graph, Shape} from "@antv/x6";

function App() {
    const graphContainer: any = useRef<HTMLDivElement>(null);
    const stencilContainer: any = useRef<HTMLDivElement>(null);
    let graph :Graph;
    useEffect(() => {
        if (!graph) {
            graph = new Graph({
                container: graphContainer.current,
                selecting:true,
                snapline: {
                    enabled: true,
                    sharp: true,
                },
                grid: {
                    visible: true,
                },
            });
            graph.centerContent();
            graph.addNode({
                x: 130,
                y: 30,
                width: 100,
                height: 40,
                attrs: {
                    label: {
                        text: 'rect',
                        fill: '#6a6c8a',
                    },
                    body: {
                        stroke: '#31d0c6',
                        strokeWidth: 2,
                    },
                },
            });

            const stencil = new Addon.Stencil({
                title: '工作流编辑器',
                target: graph,
                collapsable: true,
                stencilGraphOptions : {
                    grid:1,
                },
                layoutOptions:{
                    columnWidth:175,
                    columns:1,
                    center:true,
                },
                groups: [
                    {
                        name: 'group1',
                        graphWidth:200,
                        graphHeight:500,
                    },
                    {
                        name: 'group2',
                    },
                ],
            });

            stencilContainer.current.appendChild(stencil.container);

            var r = new Shape.Rect({
                size: {width: 100, height: 40},
                attrs: {
                    rect: {fill: '#31D0C6', stroke: '#4B4A67', 'stroke-width': 8},
                    text: {text: 'rect', fill: 'white'},
                },
            })

            var c = new Shape.Circle({
                // position: {x: 10, y: 100},
                size: {width: 70, height: 90},
                attrs: {
                    circle: {fill: '#FE854F', 'stroke-width': 8, stroke: '#4B4A67'},
                    text: {text: 'ellipse', fill: 'white'},
                },
            })
            var c1 = new Shape.Circle({
                // position: {x: 10, y: 100},
                size: {width: 70, height: 90},
                attrs: {
                    circle: {fill: '#FE854F', 'stroke-width': 8, stroke: '#4B4A67'},
                    text: {text: 'ellipse', fill: 'white'},
                },
            })
            stencil.load([r, c,c1],'group1')
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
            <div ref={graphContainer} style={{position:'absolute',width: 'calc(100% - 200px)', left: '200px', height: '100vh'}}/>
        </>
    );
}

export default App;
