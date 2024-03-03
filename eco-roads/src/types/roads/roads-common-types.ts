import {IFeatureWrapper} from "../map/wrappers/basic-wrappers";
import {Coordinate} from "ol/coordinate";
import {SmartCoordinates} from "../../utils/common-types";
import {UUID} from "node:crypto";

/* Building roads covering */

export interface Center {
    id: string,
    coordinates: SmartCoordinates
    radius: number
}

export interface OlCenterElement extends Center {
    featureWrapper?: IFeatureWrapper;
}

export interface RoadsCoveringBuildingConfig {
    name: string;
    center: OlCenterElement;
}

/* Using roads covering */

export interface RoadsCovering {
    id: string;
    name: string;
    roadsMap: Map<string, Road>
    graphRoad: GraphRoad
}

export interface Road {
    id: string;
    name: string;
    roadPoints: RoadPoint[];
    lanes: number;
}

export interface RoadPoint {
    id: string;
    center: SmartCoordinates;
}

export interface GraphRoad {
    roadPoints: Map<string, RoadPoint>
}