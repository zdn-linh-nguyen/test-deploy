import mapAPI from "@/api/mapApi";
import notiApi from "@/api/notiApi";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { LazyLoadingComponent } from "@/components/loading/lazy";
import { default as LoadingV } from "@/components/loadingv";
import SwipeItem from "@/components/swipe/swipeItem/swipeItem";
import UserCard from "@/components/swipe/userCard/userCard";
import Title from "@/components/title";
import { userMatch } from "@/reducers/matchAction";
import { addMatch } from "@/reducers/matchSlice";
import { selectRange } from "@/reducers/rangeSlice";
import { selectSocket } from "@/reducers/socketSlice";
import { getProfile } from "@/reducers/userAction";
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

export default function Swipe() {
	const sRange = useAppSelector(selectRange);
	const { socket } = useAppSelector(selectSocket);

	const [tinder, setTinder] = useState<IData[]>([]);
	const [user, setUser] = useState<IData>();
	const [notification, setNotification] = useState<IUserMatch[]>([]);

	const dispatch = useAppDispatch();

	useEffect(() => {
		const listenToNoti = async () => {
			try {
				const res = await dispatch(getProfile());
				const userId = res.payload.data.userId;
				socket.on(`noti-${userId}`, (noti) => {
					dispatch(addMatch(noti));
					setNotification((prev) => [...prev, noti]);
				});
			} catch (error) {
				console.log(error);
			}
		};

		const getNotitication = async () => {
			try {
				const notis = await notiApi.getAllNoti();
				setNotification(notis.data);
			} catch (error) {
				console.log(error);
			}
		};

		const fetchUserAround = async () => {
			try {
				const res = await mapAPI.getLocation(sRange.range);
				setTinder(res.data);
			} catch (error) {
				toastError("Không có người dùng nào lân cận!");
			}
		};

		listenToNoti();
		getNotitication();
		fetchUserAround();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, sRange.range]);

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
				<LoadingV />
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
