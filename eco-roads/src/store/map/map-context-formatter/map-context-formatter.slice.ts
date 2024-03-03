import {ActionReducerMapBuilder, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IMapContext} from "../../../types/map/map-types";
import {IFeatureWrapper} from "../../../types/map/wrappers/basic-wrappers";
import {OlCenterElement} from "../../../types/roads/roads-common-types";
import {setCurrentRoadsCoveringCenter} from "../roads-builder/roads-builder.slice";

type MapContextState = {
    mapContext: IMapContext;
    activePoints: IFeatureWrapper[];
    activeLines: IFeatureWrapper[];
}

const initialState: MapContextState = {
    mapContext: undefined,
    activePoints: [],
    activeLines: []
}

const mapContextComposerSlice = createSlice({
    name: 'mapContextFormatter',
    initialState,
    reducers: {
        setMapContext(state: MapContextState, action: PayloadAction<IMapContext>) {
            state.mapContext = action.payload;
        },
        changeTruckRouteVisibility(state: MapContextState, action: PayloadAction<{ truckRouteId: string }>) {
            state.activePoints = toggleFeaturesStateByGroupId(state.activePoints, action.payload.truckRouteId)
            state.activeLines = toggleFeaturesStateByGroupId(state.activeLines, action.payload.truckRouteId)
        }
    },
    extraReducers: (builder: ActionReducerMapBuilder<MapContextState>) => {
        builder
            .addCase(setCurrentRoadsCoveringCenter,
                (state: MapContextState, action: PayloadAction<OlCenterElement>) => {
                    state.activePoints = [action.payload.featureWrapper]
                })
    }
})

const toggleFeaturesStateByGroupId = (features: IFeatureWrapper[], groupId: string) => {
    return features
        .map(feature => {
            if (feature.groupId === groupId) {
                return {...feature, isActive: !feature.isActive}
            }
            return feature;
        })
}

export const {setMapContext, changeTruckRouteVisibility} = mapContextComposerSlice.actions;
export default mapContextComposerSlice.reducer;