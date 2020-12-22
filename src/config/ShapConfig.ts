import {Shape} from '@antv/x6'

Shape.Rect.config({
    ports: {
        groups: {
            in: {
                position: { name: 'left' },
            },
            out: {
                position: { name: 'right' },
            },
        },
    },
    portMarkup: [
        {
            tagName: 'circle',
            selector: 'portBody',
            attrs: {
                magnet: 'true',
                r: 6,
                fill: '#fff',
                stroke: '#000',
                'stroke-width': 2,
            },
        },
    ],
})


Shape.Circle.config({
    ports: {
        groups: {
            in: {
                position: { name: 'left' },
            },
            out: {
                position: { name: 'right' },
            },
        },
    },
    portMarkup: [
        {
            tagName: 'circle',
            selector: 'portBody',
            attrs: {
                magnet: 'true',
                r: 6,
                fill: '#fff',
                stroke: '#000',
                'stroke-width': 2,
            },
        },
    ],
})

Shape.Polygon.config({
    ports: {
        groups: {
            in: {
                position: { name: 'left' },
            },
            out: {
                position: { name: 'right' },
            },
        },
    },
    portMarkup: [
        {
            tagName: 'circle',
            selector: 'portBody',
            attrs: {
                magnet: 'true',
                r: 6,
                fill: '#fff',
                stroke: '#000',
                'stroke-width': 2,
            },
        },
    ],
})



