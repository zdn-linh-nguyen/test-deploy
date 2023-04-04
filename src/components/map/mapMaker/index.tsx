import { useAppSelector } from "@/app/store";
import { default as valueEarthCircum } from "@/constant/value";
import { selectRange } from "@/reducers/rangeSlice";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { memo, useEffect } from "react";
import { Marker, useMapEvents } from "react-leaflet";
import styles from "./map-maker.module.scss";

interface IProps {
	location: IUpdateLocation;
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

function MapMaker({ isFocus, location, info }: IProps) {
	const sRange = useAppSelector(selectRange);
	const earthCircum = valueEarthCircum;
	const userAvatar = info.avatar ? info.avatar : "/assets/images/avatar.png";

	const map = useMapEvents({});
	useEffect(() => {
		const flyTo = 16 - (sRange.range / earthCircum) * 360;
		if (location) {
			map.flyTo([location.latitude, location.longitude], flyTo);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sRange.range]);

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
