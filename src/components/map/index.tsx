import blockAPI from "@/api/blockApi";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { userMatch } from "@/reducers/matchAction";
import { selectRange } from "@/reducers/rangeSlice";
import { IUser, IUserLocation } from "@/types/interface";
import { toastError, toastSuccess } from "@/utils/toast";
import "leaflet/dist/leaflet.css";
import { Dispatch, useState } from "react";
import { Circle, MapContainer, TileLayer } from "react-leaflet";
import RangeIcon from "../icons/rangeIcon";
import SwipeItem from "../swipe/swipeItem/swipeItem";
import RangeDialog from "./dialog/range";
import styles from "./map.module.scss";
import MapUserInfo from "./mapInfo";
import MapMaker from "./mapMaker";
import MapMakerFriend from "./mapMakerFriend";

interface Props {
	isFocus?: boolean;
	me?: IUserLocation;
	friends: {
		user: IProfile;
		long: number;
		lat: number;
		distance: number;
	}[];
	info: IProfile;
	handleFocus: () => void;
	setFriends: Dispatch<any>;
}

interface IUserInFo {
	user: IProfile;
	long: number;
	lat: number;
	distance: number;
}

export default function Map({ me, isFocus, handleFocus, friends, setFriends, info }: Props) {
	const sRange = useAppSelector(selectRange);
	const dispatch = useAppDispatch();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [userInfo, setUserInfo] = useState<IUserInFo>();

	const [isOpenRangeDialog, setIsOpenRangeDialog] = useState<boolean>(false);

	const handleOpenRangeDialog = (): void => {
		setIsOpenRangeDialog(true);
	};
	const handleCloseRangeDialog = (): void => setIsOpenRangeDialog(false);

	const saveUserInfo = (user: any) => {
		setUserInfo({
			user: user.user,
			long: user.long,
			lat: user.lat,
			distance: user.distance,
		});
	};
	const handleClose = () => {
		setIsOpen(false);
	};
	const handleMatch = async (id: string) => {
		setIsLoading(true);
		try {
			await dispatch(userMatch(id));
			setFriends([...friends.filter((user) => user.user.userId !== id)]);
			setUserInfo(undefined);
			toastSuccess("Bạn đã thích thành công");
		} catch (error) {
			toastError((error as IResponseError).error);
		}
		setIsLoading(false);
	};

	const handleBlock = async (id: string) => {
		if (window.confirm("Bạn có chắc chắn muốn chặn người này?")) {
			try {
				await blockAPI.blockUser(id);
				setFriends([...friends.filter((user) => user.user.userId !== id)]);
				setUserInfo(undefined);
				toastSuccess(`Đã chặn người này!`);
			} catch (error) {
				toastError((error as Error).message);
			}
		}
	};
	const handleNext = (currentPerson: IUser | undefined) => () => {
		// if (!currentPerson) {
		// 	setUserInfo(friends[0]);
		// } else {
		// 	const personIndex = friends.findIndex((person) => person._id === currentPerson._id);
		// 	if (personIndex >= 0) {
		// 		if (personIndex === friends.length - 1) {
		// 			setUserInfo(friends[0]);
		// 		} else {
		// 			setUserInfo(friends[personIndex + 1]);
		// 		}
		// 	}
		// }

		if (!currentPerson) {
			toastSuccess("Người tiếp theo chưa có");
		} else {
			toastError("Bạn đã xem hết người xung quanh");
		}
	};

	const handlePrevious = (currentPerson: IUser | undefined) => () => {
		// if (!currentPerson) {
		// 	setUserInfo(friends[friends.length - 1]);
		// } else {
		// 	const personIndex = friends.findIndex((person) => person._id === currentPerson._id);
		// 	if (personIndex >= 0) {
		// 		if (personIndex === 0) {
		// 			setUserInfo(friends[friends.length - 1]);
		// 		} else {
		// 			setUserInfo(friends[personIndex - 1]);
		// 		}
		// 	}
		// }
		if (!currentPerson) {
			toastSuccess("Người trước chưa có");
		} else {
			toastError("Bạn đã xem hết người xung quanh");
		}
	};

	return (
		<>
			<section className={styles.container}>
				{me ? (
					<>
						<RangeDialog
							isOpen={isOpenRangeDialog}
							onClose={handleCloseRangeDialog}
							range={sRange.range}
						/>
						<button onClick={handleOpenRangeDialog} className={styles.container__btnNext}>
							<RangeIcon />
						</button>
						{/* <button className={styles.container__btnLocation} onClick={handleFocus}>
							<LocationIcon />
						</button>
						<button className={styles.container__btnNext} onClick={handleNext(userInfo)}>
							<BiSkipNext />
						</button>
						<button className={styles.container__btnPrev} onClick={handlePrevious(userInfo)}>
							<BiSkipPrevious />
						</button> */}
					</>
				) : (
					<div className={styles.container__notMe}>Vui lòng cấp quyền truy cập vị trí</div>
				)}
				<MapContainer
					center={me && [me.latitude, me.longitude]}
					zoom={16}
					dragging={false}
					doubleClickZoom={false}
					attributionControl={false}
					zoomControl={false}
					scrollWheelZoom={false}
					className={styles.container__mapContainer}
				>
					<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
					{me && (
						<>
							<MapMaker location={me} info={info} isFocus={isFocus} />
							<Circle
								center={[me.latitude, me.longitude]}
								radius={sRange.range}
								color="#fac3ce"
							/>
						</>
					)}
					{friends?.map((friend) => (
						<MapMakerFriend key={friend.user.userId} info={friend} onClick={saveUserInfo} />
					))}
				</MapContainer>

				{userInfo && <MapUserInfo data={userInfo} onClick={() => setIsOpen(true)} />}
				{isOpen && userInfo && (
					<SwipeItem
						isLoading={isLoading}
						data={userInfo}
						onClose={handleClose}
						onMatch={handleMatch}
						onBlock={handleBlock}
					/>
				)}
			</section>
		</>
	);
}
