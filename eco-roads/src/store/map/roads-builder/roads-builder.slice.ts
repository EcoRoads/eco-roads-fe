import {ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    RoadsCoveringFetchResponse,
    RoadsCoveringCreateRequest,
    RoadsCoveringFetchRequest,
    RoadsCoveringCreateResponse
} from "../../../types/roads/roads-builder-types";
import ky from "ky";
import {
    Center, OlCenterElement,
    RoadsCovering,
    RoadsCoveringBuildingConfig,
} from "../../../types/roads/roads-common-types";
import {IFeatureWrapper} from "../../../types/map/wrappers/basic-wrappers";
import {PointFeature} from "../../../components/open-layers/atomic/features/PointFeature";
import {MapIconWithText} from "../../../components/open-layers/atomic/styles/MapIconWithText";
import {fromSmartToSimpleCoordinate, getRandomColor, toOpenLayersCoordinates} from "../../../utils/map-helper";

type RoadsBuilderState = {
    roadsCoveringBuildingConfig: RoadsCoveringBuildingConfig;
    roadsCovering: RoadsCovering;
    lastRoadsCoveringIds: String[];
    error: string | null;
    loading: boolean;
}

const initialState: RoadsBuilderState = {
    roadsCoveringBuildingConfig: {
        name: "Default name",
        center: {id: "0", coordinates: {longitude: 0.0, latitude: 0.0}, radius: 50.0}
    },
    roadsCovering: null,
    lastRoadsCoveringIds: [],
    error: null,
    loading: false,
}

// todo(r.yatmanov) start using GET
export const fetchRoadsCovering =
    createAsyncThunk<RoadsCoveringFetchResponse, RoadsCoveringFetchRequest, { rejectValue: string }>(
        'roadsBuilder/fetchRoadsCovering',
        async function (roadsCoveringFetchRequest, {rejectWithValue}) {
            try {
                let suffix;
                switch (roadsCoveringFetchRequest.param) {
                    case "ID":
                        suffix = "/id/".concat(roadsCoveringFetchRequest.id);
                        break;
                    case "NAME":
                        suffix = "/name/".concat(roadsCoveringFetchRequest.name);
                        break;
                    default:
                        console.log("invalid param for fetching roads covering")
                }
                return await ky
                    .get('api/roads-covering/fetch'.concat(suffix),
                        {prefixUrl: 'http://localhost:8080'}
                    )
                    .json();
            } catch (error) {
                return rejectWithValue(error.message);
            }
        }
    );

export const createRoadsCovering = createAsyncThunk<RoadsCoveringCreateResponse, RoadsCoveringBuildingConfig, {
    rejectValue: string
}>(
    'roadsBuilder/createRoadsCovering',
    async function (roadsCoveringConfig, {rejectWithValue}) {
        try {
            return await ky
                .post("api/roads-covering/create", {
                    prefixUrl: 'http://localhost:8080',
                    headers: {
                        'content-type': 'application/json'
                    },
                    json: <RoadsCoveringCreateRequest>{
                        config: {
                            name: roadsCoveringConfig.name,
                            radiusAround: roadsCoveringConfig.center.radius,
                            center: roadsCoveringConfig.center.coordinates
                        },
                    }
                })
                .json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const setError = (state, action) => {
    state.error = action.payload
    state.loading = false
}

const setPending = (state) => {
    state.loading = true
    state.error = null
}

const roadsBuilderSlice = createSlice({
    name: 'roadsBuilder',
    initialState,
    reducers: {
        //todo(r.yatmanov) - create centerS
        setCurrentRoadsCoveringCenter(state: RoadsBuilderState, action: PayloadAction<OlCenterElement>) {
            action.payload.id = (0).toString()
            action.payload.radius = action.payload.radius == null ? 50.0 : action.payload.radius
            action.payload.featureWrapper = <IFeatureWrapper>{
                id: action.payload.id,
                feature: PointFeature(
                    toOpenLayersCoordinates(fromSmartToSimpleCoordinate(action.payload.coordinates)),
                    MapIconWithText(action.payload.id, getRandomColor())
                ),
                isActive: true
            }

            state.roadsCoveringBuildingConfig.center = action.payload
        },
        changeRoadsCoveringCenterData(state: RoadsBuilderState, action: PayloadAction<Center>) {
            state.roadsCoveringBuildingConfig.center = {
                ...state.roadsCoveringBuildingConfig.center,
                radius: action.payload.radius
            }
        },
        changeRoadsCoveringConfig(state: RoadsBuilderState, action: PayloadAction<{ name: string }>) {
            return {
                ...state,
                roadsCoveringBuildingConfig: {
                    ...state.roadsCoveringBuildingConfig,
                    name: action.payload.name
                }
            };
        }
    },
    extraReducers:
        (builder: ActionReducerMapBuilder<RoadsBuilderState>) => {
            builder
                .addCase(fetchRoadsCovering.pending, (state) => setPending(state))
                .addCase(fetchRoadsCovering.fulfilled, (state, action) => {
                    console.log(action.payload.roadsCovering);
                    state.roadsCovering = {
                        id: action.payload.roadsCovering.id,
                        name: action.payload.roadsCovering.name ?
                            action.payload.roadsCovering.name : "NONAME",
                        roadsMap: action.payload.roadsCovering.roadsMap,
                        graphRoad: action.payload.roadsCovering.graphRoad
                    };
                    state.loading = false;
                })
                .addCase(fetchRoadsCovering.rejected,
                    (state, action) => setError(state, action))
                .addCase(createRoadsCovering.pending, (state) => setPending(state))
                .addCase(createRoadsCovering.fulfilled, (state, action) => {
                    state.lastRoadsCoveringIds.push(action.payload.id)
                    state.loading = false;
                })
                .addCase(createRoadsCovering.rejected,
                    (state, action) => setError(state, action))
        }
})

export const {
    changeRoadsCoveringCenterData,
    setCurrentRoadsCoveringCenter,
    changeRoadsCoveringConfig,
} = roadsBuilderSlice.actions;

export default roadsBuilderSlice.reducer;