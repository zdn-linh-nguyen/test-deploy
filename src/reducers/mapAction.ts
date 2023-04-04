import mapAPI from "@/api/mapApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createLocation = createAsyncThunk(
	"map/createLocation",
	async (_data: { long: number; lat: number }, thunkApi) => {
		try {
			const mapLocation = await mapAPI.createLogin(_data);
			return mapLocation;
		} catch (error) {
			// thunkApi.dispatch(resetUser());
			return thunkApi.rejectWithValue(error);
		}
	}
);
