import {Shape} from "@antv/x6";

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
            attrs: {
                circle: {
                    fill: '#78cbc6',
                    stroke: '#4b4a67',
                },
            },
        },
    ],
    data: {}
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
            attrs: {
                circle: {
                    fill: '#e0a88f',
                    stroke: '#4b4a67',
                },
            },
        },
    ]
});

const taskNode: any = new Shape.Rect(
    {
        width: 100,
        height: 50,
        attrs: {
            label: {
                text: '任务',
            },
            body: {
                fill: '#a7cae9',
                stroke: '#4B4A67',
                strokeWidth: 4,
                rx: 5,
                ry: 5,
            },
        },
        ports: [
            {
                id: 'in-1',
                group: 'in',
                attrs: {
                    circle: {
                        fill: '#e0a88f',
                        stroke: '#4b4a67',
                    },
                },
            },
            {
                id: 'out-1',
                group: 'out',
                attrs: {
                    circle: {
                        fill: '#78cbc6',
                        stroke: '#4b4a67',
                    },
                },
            },
        ],
    }
)
const groupNode001 = {
    shape: 'rect-headered',
    width: 120,
    height: 70,
    attrs: {
        header: {
            fill: '#e5d5c7',
            refWidth: '100%',
            height: 25,
            stroke: '#000000',
        },
        headerText: {
            text: '001',
            fill: 'black',
            refX: '50%',
            refY: 12,
            fontSize: 14,
        },
        body: {
            fill: '#adcfb7',
            refWidth: '100%',
            refHeight: '100%',
        },
    },
}

const groupNode002 = {
    shape: 'rect-headered',
    width: 120,
    height: 70,
    attrs: {
        header: {
            fill: '#c5d3ee',
            refWidth: '100%',
            height: 25,
            stroke: '#000000',
        },
        headerText: {
            text: '002',
            fill: 'black',
            refX: '50%',
            refY: 12,
            fontSize: 14,
        },
        body: {
            fill: '#adcfb7',
            refWidth: '100%',
            refHeight: '100%',
        },
    },
}

const groupNode = {
    shape: 'rect-headered',
    width: 120,
    height: 70,
    attrs: {
        header: {
            fill: '#c7e5e1',
            refWidth: '100%',
            height: 25,
            stroke: '#000000',
        },
        headerText: {
            text: '',
            fill: 'black',
            refX: '50%',
            refY: 12,
            fontSize: 14,
        },
        body: {
            fill: '#adcfb7',
            refWidth: '100%',
            refHeight: '100%',
        },
    },
}


const switchNode: any = new Shape.Polygon(
    {
        width: 50,
        height: 50,
        label: 'X',
        attrs: {
            body: {
                fill: '#efdbff',
                stroke: '#4b4a67',
                strokeWidth: 4,
                refPoints: '0,10 10,0 20,10 10,20',
            },
        },
        ports: [
            {
                id: 'in-1',
                group: 'in',
                attrs: {
                    circle: {
                        fill: '#e0a88f',
                        stroke: '#4b4a67',
                    },
                },
            },
            {
                id: 'out-1',
                group: 'out',
                attrs: {
                    circle: {
                        fill: '#78cbc6',
                        stroke: '#4b4a67',
                    },
                },
            },
        ],
    }
)

const edgeCommon = {
    attrs: {
        line: {
            stroke: '#4b4a67',
            strokeWidth: 6,
            targetMarker: {
                name: 'classic',
                height: 15,
                offset: 0,
            },
        },
    },
    connector: 'rounded',
}

const edgeSwitch = {
    shape: 'double-edge',
    attrs: {
        line: {
            stroke: '#e39a69',
            strokeWidth: 2,
            targetMarker: {
                name: 'classic',
                height: 15,
                offset: 0,
            },
        },
    },
    connector: 'rounded',
}


export {
    startNode,
    endNode,
    taskNode,
    switchNode,
    edgeCommon,
    edgeSwitch,
    groupNode001,
    groupNode002,
    groupNode
};

