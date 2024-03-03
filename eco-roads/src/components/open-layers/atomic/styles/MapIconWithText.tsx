import {Style, Fill, Icon, Text, Stroke} from "ol/style";

export const MapIconWithText = (textToEmplace: string, color: number[]) => new Style({
    image: new Icon({
        anchor: [0.5, 111],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        color: color,
        src: 'icons/bin_marker_128.png',
        scale: 0.45
    }),
    text: new Text({
        font: '13px Calibri',
        placement: 'line',
        offsetY: -30,
        offsetX: -1,
        text: textToEmplace,
        fill: new Fill({
            color: '#000'
        }),
        stroke: new Stroke({
            color: '#fff',
            width: 2
        })
    })
});
