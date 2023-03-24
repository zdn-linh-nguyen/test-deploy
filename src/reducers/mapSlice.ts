import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { createLocation, getLocation } from "./mapAction";

interface IInitialState {
	lat: number;
	long: number;
}
const initialState: IInitialState = {
	lat: 0,
	long: 0,
};

const mapSlice = createSlice({
	name: "map",
	initialState: initialState,
	reducers: {
		updateLocation: (state, action) => {
			state.lat = action.payload.lat;
			state.long = action.payload.long;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(createLocation.fulfilled, (state, { payload }) => {
			const { data } = payload;
			state.lat = data.lat;
			state.long = data.long;
		});
		builder.addCase(getLocation.fulfilled, (state, { payload }) => {
			const { data } = payload;
			state.lat = data.lat;
			state.long = data.long;
		});
	},
});

export const selectMap = (state: RootState) => state.map;
export const { updateLocation } = mapSlice.actions;
export default mapSlice.reducer;
