import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { memo } from "react";
import { Marker } from "react-leaflet";

interface ITests {
	user: IProfile;
	long: number;
	lat: number;
	distance: number;
}

interface Props {
	info: {
		user: IProfile;
		long: number;
		lat: number;
		distance: number;
	};
	onClick?: (user: ITests) => void;
}

function getIconMarker() {
	return L.icon({
		iconUrl: "/Pin.svg",
		iconSize: [50, 50],
		iconAnchor: [25, 50],
	});
}

function MapMakerFriend({ info, onClick }: Props) {
	return (
		<>
			<Marker
				eventHandlers={{
					click: () => {
						{
							onClick &&
								onClick({
									user: info.user,
									long: info.long,
									lat: info.lat,
									distance: info.distance,
								});
						}
					},
				}}
				position={[info.lat, info.long]}
				icon={getIconMarker()}
			></Marker>
		</>
	);
}
// export default (MapMaker);
export default memo(MapMakerFriend);
