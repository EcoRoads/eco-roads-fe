import Style from "ol/style/Style";
import Circle from "ol/style/Circle";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";

export const MapCircle = (radiusSize: number, color: number[]) => new Style({
    image: new Circle({
        radius: radiusSize,
        fill: new Fill({color: color}),
        stroke: new Stroke({
            color: [0, 0, 0], width: 0.5
        })
    })
});