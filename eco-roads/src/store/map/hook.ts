import {useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import type {RootState, AppDispatch} from "../store";
import {ActionCreatorsMapObject, bindActionCreators} from "redux";
import {useMemo} from "react";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;