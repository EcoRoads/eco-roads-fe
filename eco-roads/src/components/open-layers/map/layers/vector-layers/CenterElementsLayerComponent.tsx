import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {MapBrowserEvent, Overlay} from "ol";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import {TVectorLayerProps} from "../../../../../types/map/layers/vector/vector-types";
import {Geometry} from "ol/geom";
import {useAppDispatch, useAppSelector} from "../../../../../store/map/hook";
import {AppDispatch} from "../../../../../store/store";
import {shallowEqual} from "react-redux";
import {fromSimpleToSmartCoordinate, toGeoCoordinates} from "../../../../../utils/map-helper";
import {setCurrentRoadsCoveringCenter} from "../../../../../store/map/roads-builder/roads-builder.slice";

export const CenterElementsLayerComponent: React.FC<TVectorLayerProps> = () => {
    const [source, setSource] = useState<VectorSource<Geometry>>(new VectorSource({}));
    const [layer, setLayer] = useState<VectorLayer<VectorSource<Geometry>>>(new VectorLayer({source: source}));
    const [mapContext, activePointsFeatures] = useAppSelector(state =>
        [
            state.mapContextFormatter.mapContext,
            state.mapContextFormatter.activePoints
        ], shallowEqual);
    const dispatch: AppDispatch = useAppDispatch();

    useEffect(() => {
        if (!mapContext)
            return

        console.log("Center Elements Layer Mounted")

        mapContext.map.addLayer(layer)

        mapContext.map.on("singleclick", onMapSingleClick)

        return () => {
            console.log('Center Elements Layer Unmounted');
            mapContext.map.removeLayer(layer)
        };
    }, [mapContext]);

    useEffect(() => {
        source.clear()
        source.addFeatures(
            activePointsFeatures
                .filter(activePoint => activePoint.isActive)
                .map(activePoint => activePoint.feature)
        )
    }, [activePointsFeatures])

    const onMapSingleClick = (event: MapBrowserEvent<UIEvent>) => {
        dispatch(setCurrentRoadsCoveringCenter({
            id: undefined,
            coordinates: fromSimpleToSmartCoordinate(toGeoCoordinates(event.coordinate)),
            radius: 50.0
        }))

    };

    return null;
}
