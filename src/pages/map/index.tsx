"use client";
import mapAPI from "@/api/mapApi";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { selectRange } from "@/reducers/rangeSlice";
import { getProfile } from "@/reducers/userAction";
import { selectUser } from "@/reducers/userSlice";
import { IUpdateLocation } from "@/types/map";
import { toastError } from "@/utils/toast";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Map = dynamic(() => import("@/components/map"), { ssr: false });

interface IFriends {
	user: IProfile;
	lat: number;
	long: number;
	distance: number;
}
export default function MapContainer() {
	const dispatch = useAppDispatch();
	const sRange = useAppSelector(selectRange);
	const sUser = useAppSelector(selectUser);
	const [friends, setFriends] = useState<IFriends[]>([]);
	const [isFocus, setIsFocus] = useState<boolean>(false);

	useEffect(() => {
		dispatch(getProfile());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		async function fetchLocation() {
			try {
				const res = await mapAPI.getLocation(sRange.range);
				setFriends(res.data);
			} catch (error) {
				toastError((error as Error).message);
			}
		}
		fetchLocation();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [location, setLocation] = useState<IUpdateLocation>({
		latitude: 0,
		longitude: 0,
	});

	const handlePermission = async () => {
		if (global.navigator && global.navigator.geolocation) {
			global.navigator.geolocation.getCurrentPosition(
				async (position) => {
					await setLocation({
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
					});
				},
				() => {}
			);
		} else {
			toastError("Bạn chưa cấp quyền vị trí vì vậy không thể tìm bạn bè xung quanh");
		}
	};

	const handleFocus = () => {
		setIsFocus((pre) => !pre);
	};

	useEffect(() => {
		handlePermission();
		// 	setFriends([]);
		// return () => {
		// };
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<>
			<Map
				info={sUser}
				me={location || undefined}
				// isFocus={isFocus}
				friends={friends}
				handleFocus={handleFocus}
				setFriends={setFriends}
			/>
		</>
	);
}

MapContainer.protected = true;
