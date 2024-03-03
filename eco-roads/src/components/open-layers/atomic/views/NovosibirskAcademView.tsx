import View from "ol/View";
import {transform} from "ol/proj";

export const NovosibirskAcademView: View = new View({
    center: transform([83.102, 54.845], 'EPSG:4326', 'EPSG:3857'),
    zoom: 14,
})