import { useAppDispatch } from "@/app/store";
import { IUser, IUserLocation } from "@/types/interface";
import { profile } from "@/utils/data";
import { toastError, toastSuccess } from "@/utils/toast";
import { Dispatch, useState } from "react";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { Circle, MapContainer, TileLayer } from "react-leaflet";
import { LocationIcon } from "../icons";
import styles from "./map.module.scss";
import MapUserInfo from "./mapInfo";
import MapMaker from "./mapMaker";
import MapMakerFriend from "./mapMakerFriend";

type Props = {
	isFocus?: boolean;
	me?: IUserLocation;
	friends: IUser[];
	handleFocus: () => void;
	setFriends: Dispatch<any>;
};

export default function Map({ me, isFocus, handleFocus, friends, setFriends }: Props) {
	const dispatch = useAppDispatch();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [userInfo, setUserInfo] = useState<IUser>(profile);

	const saveUserInfo = (user: IUser) => {
		setUserInfo(user);
	};
	const handleClose = () => {
		setIsOpen(false);
	};
	const handleLike = async (_id: string) => {
		setIsLoading(true);
		try {
			// await dispatch(userLikeUser(_id)).unwrap();
			// setFriends([...friends.filter((user) => user._id !== _id)]);
			// setUserInfo(undefined);
			toastSuccess("Bạn đã thích thành công");
		} catch (error) {
			toastError((error as IResponseError).error);
		}
		setIsLoading(false);
	};

	const handleBlock = async (_id: string) => {
		if (window.confirm("Bạn có chắc chắn muốn chặn người này?")) {
			setIsLoading(true);
			try {
				// await dispatch(userBlockUser(_id)).unwrap();
				// setFriends([...friends.filter((user) => user._id !== _id)]);
				// setUserInfo(undefined);
				toastSuccess("Bạn đã chặn thành công");
			} catch (error) {
				toastError((error as IResponseError).error);
			}
			setIsLoading(false);
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
		<section className={styles.container}>
			{me ? (
				<>
					<button className={styles.container__btnLocation} onClick={handleFocus}>
						<LocationIcon />
					</button>

					<button className={styles.container__btnNext} onClick={handleNext(userInfo)}>
						<BiSkipNext />
					</button>

					<button className={styles.container__btnPrev} onClick={handlePrevious(userInfo)}>
						<BiSkipPrevious />
					</button>
				</>
			) : (
				<div className={styles.container__notMe}>Vui lòng cấp quyền truy cập vị trí</div>
			)}
			<MapContainer
				center={me && [me.latitude, me.longitude]}
				zoom={16}
				scrollWheelZoom={false}
				className={styles.container__mapContainer}
			>
				<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
				{me && (
					<>
						<MapMaker info={me} isFocus={isFocus} />
						<Circle center={[me.latitude, me.longitude]} radius={400} color="#fac3ce" />
					</>
				)}
				{friends?.map((friend, index) => (
					<MapMakerFriend key={index} info={friend} onClick={saveUserInfo} />
				))}
			</MapContainer>
			{userInfo && <MapUserInfo data={userInfo} onClick={() => setIsOpen(true)} />}
			{/* {isOpen && userInfo && (
				<SwipeItem
					isLoading={isLoading}
					user={userInfo}
					onClose={handleClose}
					onLike={handleLike}
					onBlock={handleBlock}
				/>
			)} */}
		</section>
	);
}
