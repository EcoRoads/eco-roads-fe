import {configureStore} from "@reduxjs/toolkit";
import roadsCoveringBuilderReducer from './map/roads-builder/roads-builder.slice';
import logger from 'redux-logger'
import mapContextFormatterSlice from "./map/map-context-formatter/map-context-formatter.slice";

const store = configureStore({
    reducer: {
        roadsCoveringBuilder: roadsCoveringBuilderReducer,
        mapContextFormatter: mapContextFormatterSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }).concat(logger)
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch