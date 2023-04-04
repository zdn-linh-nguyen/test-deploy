import { useAppDispatch, useAppSelector } from "@/app/store";
import { createLocation } from "@/reducers/mapAction";
import { selectMap } from "@/reducers/mapSlice";
import { setSocket } from "@/reducers/socketSlice";
import { getProfile } from "@/reducers/userAction";
import { toastError } from "@/utils/toast";
import React, { useEffect, useRef } from "react";
import { io } from "socket.io-client";

function FakePage() {
	const sMap = useAppSelector(selectMap);
	const isSendRequest = useRef<boolean>(false);
	const dispatch = useAppDispatch();

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			return;
		}
		function getCurrentUser() {
			dispatch(getProfile());
			isSendRequest.current = true;
		}

		const handlePermission = async () => {
			if (global.navigator && global.navigator.geolocation) {
				global.navigator.geolocation.getCurrentPosition(
					async (position) => {
						const data = {
							long: position.coords.longitude,
							lat: position.coords.latitude,
						};
						dispatch(createLocation(data));
					},
					() => {}
				);
			} else {
				toastError("Bạn chưa cấp quyền vị trí vì vậy không thể tìm bạn bè xung quanh");
			}
		};

		handlePermission();
		!isSendRequest.current && getCurrentUser();

		const socket = io(process.env.API_PUBLIC as string, {
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
	return <></>;
}
export default React.memo(FakePage);
