import { useAppSelector } from "@/app/store";
import { selectRange } from "@/reducers/rangeSlice";
import { IUserLocation } from "@/types/interface";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { memo, useEffect } from "react";
import { Marker, useMapEvents } from "react-leaflet";
import styles from "./map-maker.module.scss";

interface Props {
	location: IUserLocation;
	isFocus?: boolean;
	info: IProfile;
}

function getIconMarker(imageUrl: string) {
	return L.icon({
		iconUrl: imageUrl,
		iconSize: [50, 50],
		className: `${styles.iconMarker}`,
	});
}

function MapMaker({ isFocus, location, info }: Props) {
	const sRange = useAppSelector(selectRange);
	const earthCircum = 280000;
	const flyTo = 16 - (sRange.range / earthCircum) * 360;
	const userAvatar = info.avatar ? info.avatar : "/assets/images/avatar.png";

	const map = useMapEvents({});
	useEffect(() => {
		if (location) {
			map.flyTo([location.latitude, location.longitude], flyTo);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [flyTo]);

	return (
		<>
			<Marker
				position={[location.latitude, location.longitude]}
				icon={getIconMarker(userAvatar)}
			></Marker>
		</>
	);
}
export default memo(MapMaker);
