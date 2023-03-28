import matchAPI from "@/api/matchApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const userMatch = createAsyncThunk("user/likeUser", async (id: string, thunkAPI) => {
	try {
		const res = await matchAPI.addMatch(id);
		return res;
	} catch (error) {
		return thunkAPI.rejectWithValue(error);
	}
});
