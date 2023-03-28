import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import auth from "../reducers/authSlice";
import map from "../reducers/mapSlice";
import match from "../reducers/matchSlice";
import photo from "../reducers/photoSlice";
import range from "../reducers/rangeSlice";
import user from "../reducers/userSlice";

export const store = configureStore({
	reducer: {
		auth,
		map,
		user,
		photo,
		range,
		match,
	},
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
