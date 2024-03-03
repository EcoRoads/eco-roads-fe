import Feature from "ol/Feature";
import Style from "ol/style/Style";
import {Coordinate} from "ol/coordinate";
import {LineString} from "ol/geom";

export const LineStringFeature = (coordinates: Coordinate[], style: Style) => {
    const lineStringFeature = new Feature({
        geometry: new LineString(coordinates)
    });
    lineStringFeature.setStyle(style)

    return lineStringFeature
}


