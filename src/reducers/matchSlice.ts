import { RootState } from "@/app/store";
import { IUserMatch } from "@/types/interface";
import { createSlice } from "@reduxjs/toolkit";

interface matchState {
	isShow: boolean;
	data: IUserMatch[];
}

const initialState: matchState = {
	isShow: false,
	data: [],
};

export const matchSlice = createSlice({
	name: "match",
	initialState,
	reducers: {
		clearMatch: () => {
			return initialState;
		},
		addMatch: (state, { payload }) => {
			state.data.push(payload);
			state.isShow = true;
		},
	},
});

export const { clearMatch, addMatch } = matchSlice.actions;

export const selectMatch = (state: RootState) => state.match;

export default matchSlice.reducer;
