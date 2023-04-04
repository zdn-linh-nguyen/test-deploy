"use client";
import mapAPI from "@/api/mapApi";
import { useAppDispatch, useAppSelector } from "@/app/store";
import LoadingV from "@/components/loadingv";
import { selectMap } from "@/reducers/mapSlice";
import { selectRange } from "@/reducers/rangeSlice";
import { selectUser } from "@/reducers/userSlice";
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
	const sMap = useAppSelector(selectMap);
	const [friends, setFriends] = useState<IFriends[]>([]);
	const [isFocus, setIsFocus] = useState<boolean>(false);

	const handleFocus = (): void => setIsFocus((pre) => !pre);

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
	}, [sRange.range]);
	return (
		<>
			{location && friends ? (
				<Map
					info={sUser}
					me={sMap || undefined}
					// isFocus={isFocus}
					friends={friends}
					handleFocus={handleFocus}
					setFriends={setFriends}
				/>
			) : (
				<LoadingV />
			)}
		</>
	);
}

MapContainer.protected = true;
