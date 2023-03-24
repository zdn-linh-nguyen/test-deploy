import mapAPI from "@/api/mapApi";
import { useAppDispatch } from "@/app/store";
import { LazyLoadingComponent } from "@/components/loading/lazy";
import SwipeItem from "@/components/swipe/swipeItem/swipeItem";
import UserCard from "@/components/swipe/userCard/userCard";
import Title from "@/components/title";
import { createLocation } from "@/reducers/mapAction";
import { toastError, toastSuccess } from "@/utils/toast";
import { useEffect, useState } from "react";
import { EffectCreative } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import blockAPI from "../../api/blockApi";
import styles from "./swipe.module.scss";

export interface IData {
	user: IProfile;
	distance: number;
}
export default function Swipe() {
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
				const res = await mapAPI.getLocation();
				setTinder(res.data);
			} catch (error) {
				toastError("Vui lòng đăng nhập!");
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

	const handleLike = async (_id: string) => {
		try {
			toastSuccess(`Đã thích người này ${_id}`);
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
				{tinder.length ? (
					tinder?.map((i) => (
						<SwiperSlide key={i.user.userId}>
							<LazyLoadingComponent>
								<UserCard
									onSeen={handleSeenInfo}
									onBlock={handleBlock}
									onLike={handleLike}
									user={i.user}
									distance={i.distance}
								/>
							</LazyLoadingComponent>
						</SwiperSlide>
					))
				) : (
					<div className={styles.swipe__notif__container}>
						<h3 className="swipe__notif">Hổng có ai hết</h3>
					</div>
				)}
			</Swiper>
			{user && (
				<SwipeItem data={user} onClose={handleClose} onLike={handleLike} onBlock={handleBlock} />
			)}
		</section>
	);
}

Swipe.protected = true;
