import { IUserLocation } from "@/types/interface";
import { profile } from "@/utils/data";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { memo, useEffect } from "react";
import { Marker, useMapEvents } from "react-leaflet";
import styles from "./map-maker.module.scss";

interface Props {
	info: IUserLocation;
	isFocus?: boolean;
}

function getIconMarker(imageUrl: string) {
	return L.icon({
		iconUrl: imageUrl,
		iconSize: [50, 50],
		className: `${styles.icon}`,
	});
}

function MapMaker({ isFocus, info }: Props) {
	// const userAvatar = useSelector(selectUser).data?.avatar;
	const userAvatar = profile.avatar;
	const map = useMapEvents({});
	useEffect(() => {
		if (info) {
			map.flyTo([info.latitude, info.longitude], 16);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isFocus]);

	return (
		<>
			<Marker
				position={[info.latitude, info.longitude]}
				icon={getIconMarker(userAvatar || "")}
			></Marker>
		</>
	);
}
export default memo(MapMaker);
