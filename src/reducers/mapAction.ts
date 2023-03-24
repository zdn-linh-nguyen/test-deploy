import mapAPI from "@/api/mapApi";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { resetUser } from "./userSlice";

export const createLocation = createAsyncThunk(
	"map/createLocation",
	async (_data: { long: number; lat: number }, thunkApi) => {
		try {
			const mapLocation = await mapAPI.createLogin(_data);
			return mapLocation;
		} catch (error) {
			thunkApi.dispatch(resetUser());
			return thunkApi.rejectWithValue(error);
		}
	}
);

export const getLocation = createAsyncThunk(
	"map/getLocations",
	// async (_data: { long: number; lat: number }, thunkApi) => {
	async (_data, thunkApi) => {
		try {
			const mapLocation = await mapAPI.getLocation();
			return mapLocation;
		} catch (error) {
			// thunkApi.dispatch(resetUser());
			// toast.error("Something went wrong!");
			return thunkApi.rejectWithValue(error);
		}
	}
);
