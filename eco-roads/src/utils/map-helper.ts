import {Coordinate} from "ol/coordinate";
import {transform} from "ol/proj";
import {getRandomIntMax} from "./common-helper";
import {SmartCoordinates} from "./common-types";

export const toGeoCoordinates = (coordinate: Coordinate): Coordinate => {
    return transform(coordinate, 'EPSG:3857', 'EPSG:4326');
}

export const toOpenLayersCoordinates = (coordinate: Coordinate): Coordinate => {
    return transform(coordinate, 'EPSG:4326', 'EPSG:3857');
}

export const fromSmartToSimpleCoordinate = (coordinate: SmartCoordinates): Coordinate => {
    return [coordinate.longitude, coordinate.latitude] as Coordinate;
}

export const fromSimpleToSmartCoordinate = (coordinate: Coordinate): SmartCoordinates => {
    return {longitude: coordinate.at(0), latitude: coordinate.at(1)} as SmartCoordinates;
}

export const getRandomColor = (): number[] => {
    return [getRandomIntMax(256), getRandomIntMax(256), getRandomIntMax(256), 1];
}

export const getRandomDarkColor = (): number[] => {
    return [getRandomIntMax(180), getRandomIntMax(180), getRandomIntMax(180), 1];
}

export const getBlackColor = (): number[] => {
    return [0, 0, 0, 1];
}

export const getDarkGreenColor = (): number[] => {
    return [0, 86, 63, 1];
}

export const getLightGreenColor = (): number[] => {
    return [35, 120, 65, 1];
}