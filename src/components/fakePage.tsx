import { useAppDispatch } from "@/app/store";
import { setSocket } from "@/reducers/socketSlice";
import { getProfile } from "@/reducers/userAction";
import React, { useEffect, useRef } from "react";
import { io } from "socket.io-client";

function FakePage() {
	const isSendRequest = useRef<boolean>(false);
	const dispatch = useAppDispatch();

	useEffect(() => {
		function getCurrentUser() {
			if (localStorage.getItem("token")) {
				dispatch(getProfile());
				isSendRequest.current = true;
			}
		}

		!isSendRequest.current && getCurrentUser();
		const token = localStorage?.getItem("token");
		const socket = io("https://zdn-app.herokuapp.com", {
			transportOptions: {
				polling: {
					extraHeaders: {
						Authorization: `Bearer ${token}`,
					},
				},
			},
		});
		dispatch(setSocket(socket));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return <div></div>;
}
export default React.memo(FakePage);
