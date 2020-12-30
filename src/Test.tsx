import React, {useEffect, useRef} from 'react';
import {Graph} from "@antv/x6";
import {groupNode001, taskNode} from "./stencil/StencilShap";

const Test = () => {
    const graphContainer: any = useRef<HTMLDivElement>(null);
    let graph: Graph;
    let ctrlPressed = false;
    const embedPadding = 30
    useEffect(() => {
        graph = new Graph({
            container: graphContainer.current,
            grid: true,
            embedding: {
                enabled: true,
            },
            highlighting: {
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
        });
        graph.on('node:added', ({node, index, options}) => {
            if (node.shape == 'rect-headered') {
                node.resize(360, 160, {direction: 'bottom-right'});
                node.setZIndex(-1)
            }
        })
        graph.on('node:embedding', ({ e }) => {
            ctrlPressed = e.metaKey || e.ctrlKey
        })
        graph.on('node:embedded', () => {
            ctrlPressed = false
        })
        graph.on('node:change:size', ({ node, options }) => {
            if (options.skipParentHandler) {
                return
            }

            const children = node.getChildren()
            if (children && children.length) {
                node.prop('originSize', node.getSize())
            }
        })
        graph.on('node:change:position', ({ node, options }) => {
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
                            position: { x, y },
                            size: { width: cornerX - x, height: cornerY - y },
                        },
                        { skipParentHandler: true },
                    )
                }
            }
        })

        graph.addNode(taskNode);
        graph.addNode(groupNode001);

    });

    return (
        <div ref={graphContainer} style={{
            width: '100%',
            height: '100vh'
        }}/>
    );

}
export default Test;