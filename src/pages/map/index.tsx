import { useAppDispatch, useAppSelector } from "@/app/store";
import { selectMap } from "@/reducers/mapSlice";
import { IUser } from "@/types/interface";
import { IUpdateLocation } from "@/types/map";
import { data } from "@/utils/data";
import { toastError } from "@/utils/toast";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Map = dynamic(() => import("@/components/map"), { ssr: false });

export default function MapContainer() {
	const dispatch = useAppDispatch();
	const sMap = useAppSelector(selectMap);

	// useEffect(() => {
	// 	// dispatch(getLocation());
	// 	async function fetchLocation() {
	// 		try {
	// 			const mapLocation = await mapAPI.getLocation();
	// 			console.log(mapLocation);
	// 		} catch (error) {
	// 			toastError((error as Error).message);
	// 		}
	// 	}
	// 	fetchLocation();
	// }, [dispatch]);

	const [friends, setFriends] = useState<IUser[]>(data);
	const [isFocus, setIsFocus] = useState(false);

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
