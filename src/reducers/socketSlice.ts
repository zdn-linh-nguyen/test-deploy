import { RootState } from "@/app/store";
import { createSlice } from "@reduxjs/toolkit";
import { io, Socket } from "socket.io-client";

interface ISocket {
	socket: Socket;
}

const initialState: ISocket = {
	socket: io("https://zdn-app.herokuapp.com", {
		transportOptions: {
			polling: {
				extraHeaders: {
					Authorization: `Bearer`,
				},
			},
		},
	}),
};

export const socketSlice = createSlice({
	name: "socket",
	initialState: initialState,
	reducers: {
		setSocket: (state, action) => {
			state.socket = action.payload;
		},
	},
});

export const { setSocket } = socketSlice.actions;
export const selectSocket = (state: RootState) => state.socket;

export default socketSlice.reducer;
