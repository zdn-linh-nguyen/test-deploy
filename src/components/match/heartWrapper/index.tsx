import { useAppDispatch, useAppSelector } from "@/app/store";
import { selectMatch } from "@/reducers/matchSlice";
import { selectUser } from "@/reducers/userSlice";
import { IUserMatch } from "@/types/interface";
import { useEffect } from "react";
import BigHeart from "../bigHeart";
import SmallHeart from "../smallHeart";
import styles from "./heart-wrapper.module.scss";

export interface IHeart {
	top?: number;
	left?: number;
	bottom?: number;
	width: number;
	tilt: number;
}
interface IProps {
	id: string;
	user: IUserMatch;
}

const HeartContainer = ({ id, user }: IProps) => {
	const sUser = useAppSelector(selectUser);
	const sMatch = useAppSelector(selectMatch).data;
	const leftAvatar = sUser.avatar;
	const rightAvatar = sUser.userId === sMatch.userFromId ? sMatch.toAvatar : sMatch.fromAvatar;
	const dispatch = useAppDispatch();

	const littleHearts = [
		{ top: -20, left: 10, tilt: -16, width: 30 },
		{ top: -40, left: 35, tilt: -16, width: 15 },
		{ top: -30, left: 48, tilt: 16, width: 20 },
		{ top: -45, left: 70, tilt: 18, width: 25 },
		{ top: -30, left: 89, tilt: 18, width: 15 },
		{ bottom: -15, left: 10, tilt: -16, width: 30 },
		{ bottom: -30, left: 35, tilt: 16, width: 15 },
		{ bottom: -15, left: 48, tilt: 18, width: 20 },
		{ bottom: -30, left: 70, tilt: 18, width: 25 },
		{ bottom: -10, left: 90, tilt: -6, width: 15 },
	];
	useEffect(() => {
		// async function handleSeen() {
		// 	await dispatch(notificationUpdateSeenNotification(id)).unwrap();
		// }
		// id && handleSeen();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, id]);

	return (
		<div className={`${styles.container} heart-container `}>
			<div className={`${styles.container__boxImg} icon left`}>
				{user && <BigHeart imgUrl={leftAvatar ? leftAvatar : "/assets/images/avatar.png"} />}
			</div>

			<div className={`${styles.container__boxImg} icon right`}>
				{user && <BigHeart imgUrl={rightAvatar ? rightAvatar : "/assets/images/avatar.png"} />}
			</div>
			{/* note: something went wrong */}
			{littleHearts?.map((littleHeart, index) => {
				return <SmallHeart key={`heart-${index} `} data={littleHeart} />;
			})}
		</div>
	);
};

export default HeartContainer;
