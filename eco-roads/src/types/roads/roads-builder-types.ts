import {
    RoadsCovering,
} from "./roads-common-types";
import {SmartCoordinates} from "../../utils/common-types";

/* Fetching API roads covering */
export interface RoadsCoveringFetchRequest {
    param: 'ID' | 'NAME';
    name?: string;
    id?: string;
}

export interface RoadsCoveringFetchResponse {
    roadsCovering: RoadsCovering
}

/* Building API roads covering */

export interface RoadsCoveringCreateRequest {
    config: RoadsCoveringBuildingConfigForRequest;
}

export interface RoadsCoveringBuildingConfigForRequest {
    name: string;
    center: SmartCoordinates;
    radiusAround: number;
}

export interface RoadsCoveringCreateResponse {
    id: string;
}