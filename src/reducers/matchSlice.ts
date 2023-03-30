import { RootState } from "@/app/store";
import { IUserMatch } from "@/types/interface";
import { createSlice } from "@reduxjs/toolkit";

interface matchState {
	isShow: boolean;
	data: IUserMatch;
}

const initialState: matchState = {
	isShow: false,
	data: {
		id: "",
		email: "",
		avatar: "",
		name: "",
		isSeen: false,
		userFromId: "",
		userToId: "",
		fromUserName: "",
		toUserName: "",
		fromAvatar: "",
		toAvatar: "",
		type: "",
	},
};

export const matchSlice = createSlice({
	name: "match",
	initialState,
	reducers: {
		clearMatch: () => {
			return initialState;
		},
		addMatch: (state, { payload }) => {
			state.data = payload;
			state.isShow = true;
		},
		closeMatch: (state) => {
			state.isShow = false;
		},
	},
});

export const { clearMatch, addMatch, closeMatch } = matchSlice.actions;

export const selectMatch = (state: RootState) => state.match;

export default matchSlice.reducer;
