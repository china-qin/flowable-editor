import {Node, Shape} from "@antv/x6";

const startNode: any = new Shape.Circle({
    size: {
        width: 40,
        height: 40
    },
    attrs: {
        body: {
            fill: '#78cbc6',
            stroke: '#4b4a67',
            strokeWidth: 6,
        },
        text: {
            text: 'S',
        },
    },
    ports: [
        {
            id: 'out-1',
            group: 'out',

            attrs:{
                circle: {
                    fill: '#78cbc6',
                },
            },
        },
    ]
});

const endNode: any = new Shape.Circle({
    size: {
        width: 40,
        height: 40
    },
    attrs: {
        body: {
            fill: '#e0a88f',
            stroke: '#4B4A67',
            strokeWidth: 6,
        },
        text: {
            text: 'E',
        },
    },
    ports: [
        {
            id: 'in-1',
            group: 'in',
            attrs:{
                circle: {
                    fill: '#e0a88f',
                },
            },
        },
    ]
});

const testNode: any = new Shape.Rect(
    {
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
        ports: [
            {id: 'in-1', group: 'in'},
            {id: 'in-2', group: 'in'},
            {id: 'out-1', group: 'out'},
            {id: 'out-2', group: 'out'},
        ],
    }
)

export {
    startNode,
    endNode,
    testNode
};

