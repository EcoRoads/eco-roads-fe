import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import {OSM} from "ol/source";
import {NovosibirskAcademView} from "../views/NovosibirskAcademView";
import {MutableRefObject} from "react";

export const ClassicMap = (mapDivRef: MutableRefObject<HTMLDivElement>) => new Map({
    target: mapDivRef.current,
    layers: [
        new TileLayer({
            source: new OSM()
        }),
    ],
    view: NovosibirskAcademView
});
