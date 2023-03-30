import mapAPI from "@/api/mapApi";
import notiApi from "@/api/notiApi";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { LazyLoadingComponent } from "@/components/loading/lazy";
import SwipeItem from "@/components/swipe/swipeItem/swipeItem";
import UserCard from "@/components/swipe/userCard/userCard";
import Title from "@/components/title";
import { createLocation } from "@/reducers/mapAction";
import { userMatch } from "@/reducers/matchAction";
import { addMatch } from "@/reducers/matchSlice";
import { selectRange } from "@/reducers/rangeSlice";
import { selectSocket } from "@/reducers/socketSlice";
import { getProfile } from "@/reducers/userAction";
import { selectUser } from "@/reducers/userSlice";
import { toastError, toastSuccess } from "@/utils/toast";
import { useEffect, useState } from "react";
import { EffectCreative } from "swiper";
import "swiper/css";
import "swiper/css/effect-creative";
import { Swiper, SwiperSlide } from "swiper/react";
import blockAPI from "../../api/blockApi";
import styles from "./swipe.module.scss";

export interface IData {
	user: IProfile;
	distance: number;
}

export interface INoti {
	createdAt: Date;
	fromAvatar: string;
	fromUserId: string;
	fromUserName: string;
	id: string;
	isSeen: boolean;
	toAvatar: string;
	toUserId: string;
	toUserName: string;
	type: string;
}

export default function Swipe() {
	const sRange = useAppSelector(selectRange);
	const sUser = useAppSelector(selectUser);
	const { socket } = useAppSelector(selectSocket);

	const [tinder, setTinder] = useState<IData[]>([]);
	const [user, setUser] = useState<IData>();
	const [notification, setNotification] = useState<INoti[]>([]);

	const dispatch = useAppDispatch();

	const handlePermission = async () => {
		if (global.navigator && global.navigator.geolocation) {
			global.navigator.geolocation.getCurrentPosition(
				async (position) => {
					const data = {
						long: position.coords.longitude,
						lat: position.coords.latitude,
					};
					dispatch(createLocation(data));
				},
				() => {}
			);
		} else {
			toastError("Bạn chưa cấp quyền vị trí vì vậy không thể tìm bạn bè xung quanh");
		}
	};

	useEffect(() => {
		const listenToNoti = async () => {
			const res = await dispatch(getProfile());

			socket.on(`noti-${res.payload.data.userId}`, (noti: INoti) => {
				dispatch(addMatch(noti));

				setNotification((prev) => [...prev, noti]);
			});
		};
		listenToNoti();

		const getNotitication = async () => {
			const notis = await notiApi.getAllNoti();
			setNotification(notis.data);
		};
		getNotitication();

		handlePermission();
		async function fetchUserAround() {
			try {
				const res = await mapAPI.getLocation(sRange.range);
				setTinder(res.data);
			} catch (error) {
				toastError("Không có người dùng nào lân cận!");
			}
		}
		fetchUserAround();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSeenInfo = (tinder: IData) => () => setUser(tinder);
	const handleClose = (): void => setUser(undefined);

	const handleBlock = async (id: string) => {
		if (window.confirm("Bạn có chắc chắn muốn chặn người này?")) {
			try {
				await blockAPI.blockUser(id);
				setTinder([...tinder.filter((user) => user.user.userId !== id)]);
				setUser(undefined);
				toastSuccess(`Đã chặn người này! `);
			} catch (error) {
				toastError((error as Error).message);
			}
		}
	};

	const handleMatchUser = async (id: string) => {
		try {
			dispatch(userMatch(id));
			setTinder([...tinder.filter((user) => user.user.userId !== id)]);
			setUser(undefined);
			toastSuccess("Bạn đã thích thành công");
		} catch (error) {
			toastError((error as Error).message);
		}
	};

	return (
		<section className={`container ${styles.swipe} `}>
			<Title
				className={styles.swipe__box}
				content={
					<div className={styles.swipe__box__wrap}>
						<h1>Cupidify</h1>

						{/* at least for now we don't use it, maybe in future */}
						{/* <AiOutlineBell
							style={{
								fontSize: "2.5rem",
							}}
						/>
						{notification.length} */}
					</div>
				}
			/>
			{tinder.length > 0 ? (
				<Swiper
					grabCursor={true}
					effect={"creative"}
					creativeEffect={{
						prev: {
							shadow: true,
							translate: ["-130%", 0, -500],
						},
						next: {
							shadow: true,
							translate: ["130%", 0, -500],
						},
					}}
					modules={[EffectCreative]}
				>
					{tinder?.map((i) => (
						<SwiperSlide key={i.user.userId}>
							<LazyLoadingComponent>
								<UserCard
									onSeen={handleSeenInfo}
									onBlock={handleBlock}
									onMatch={handleMatchUser}
									user={i.user}
									distance={i.distance}
								/>
							</LazyLoadingComponent>
						</SwiperSlide>
					))}
				</Swiper>
			) : (
				<div className={styles.swipe__notif__container}>
					<h3 className="swipe__notif">Hổng có ai hết</h3>
				</div>
			)}
			{user && (
				<SwipeItem
					data={user}
					onClose={handleClose}
					onMatch={handleMatchUser}
					onBlock={handleBlock}
				/>
			)}
		</section>
	);
}

Swipe.protected = true;
