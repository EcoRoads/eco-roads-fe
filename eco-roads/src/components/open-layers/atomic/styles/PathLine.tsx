import Style from "ol/style/Style";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";

export const PathLine = (color: number[]) => new Style({
    fill: new Fill({color: color}),
    stroke: new Stroke({
        color: color,
        lineCap: 'square',
        lineJoin: 'round',
        width: 5
    })
});