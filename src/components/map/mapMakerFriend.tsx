import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { memo } from "react";
import { Marker } from "react-leaflet";

interface Props {
	info: {
		user: IProfile;
		long: number;
		lat: number;
		distance: number;
	};
	focus?: IUserInFo;
	onClick?: (user: IUserInFo) => void;
}

function MapMakerFriend({ info, onClick, focus }: Props) {
	const a = info.user.userId === focus?.user.userId;
	function getIconMarkerFocus() {
		return L.icon({
			iconUrl: a ? "/Pin-focus.svg" : "/Pin.svg",
			iconSize: [50, 50],
			iconAnchor: [25, 50],
		});
	}
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
				icon={getIconMarkerFocus()}
			></Marker>
		</>
	);
}
// export default (MapMaker);
export default memo(MapMakerFriend);
