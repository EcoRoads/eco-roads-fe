import * as React from "react";
import {TMapProps, IMapContext} from "../../../types/map/map-types";
import "ol/ol.css";
import "./map.css";
import {useEffect, useRef} from "react";
import {ClassicMap} from "../atomic/maps/ClassicMap";
import {useAppDispatch} from "../../../store/map/hook";
import {RouteElementsLayer} from "./layers";
import {setMapContext} from "../../../store/map/map-context-formatter/map-context-formatter.slice";

export const MapComponent: React.FC<TMapProps> = (props) => {
    const mapDivRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        console.log("Map Component initialize")
        if (!mapDivRef.current) {
            return;
        }

        let mapContext: IMapContext = {
            map: ClassicMap(mapDivRef)
        };

        dispatch(setMapContext(mapContext));
    }, []);

    return (
        <div className="map" ref={mapDivRef}>
            <RouteElementsLayer/>
        </div>
    )
}