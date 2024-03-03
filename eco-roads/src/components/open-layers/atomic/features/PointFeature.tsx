import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import Style from "ol/style/Style";
import {Coordinate} from "ol/coordinate";

export const PointFeature = (coordinate: Coordinate, style: Style) => {
    const pointFeature = new Feature({
        geometry: new Point(coordinate)
    });
    pointFeature.setStyle(style)

    return pointFeature
}


