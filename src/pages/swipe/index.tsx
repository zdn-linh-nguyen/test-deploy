import mapAPI from "@/api/mapApi";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { LazyLoadingComponent } from "@/components/loading/lazy";
import SwipeItem from "@/components/swipe/swipeItem/swipeItem";
import UserCard from "@/components/swipe/userCard/userCard";
import Title from "@/components/title";
import { createLocation } from "@/reducers/mapAction";
import { userMatch } from "@/reducers/matchAction";
import { selectRange } from "@/reducers/rangeSlice";
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

	const [tinder, setTinder] = useState<IData[]>([]);
	const [user, setUser] = useState<IData>();

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

	const handleSeenInfo = (tinder: IData) => () => {
		setUser(tinder);
	};

	const handleClose = (): void => {
		setUser(undefined);
	};

	const handleBlock = async (_id: string) => {
		if (window.confirm("Bạn có chắc chắn muốn chặn người này?")) {
			try {
				const response = await blockAPI.blockUser(_id);
				if (response.statusCode === 201) {
					const tinderFilter = tinder?.filter((i) => i.user.userId !== _id);
					setTinder(tinderFilter);
					toastSuccess(`Đã chặn người này!`);
				}
			} catch (error) {
				toastError((error as Error).message);
			}
		}
	};

	const handleMatchUser = async (id: string) => {
		try {
			await dispatch(userMatch(id));
			toastSuccess(`Đã thích người này ${id}`);
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
						/> */}
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
