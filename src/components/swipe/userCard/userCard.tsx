import CircleButton from "@/components/button/circleButton";
import CloseIcon from "@/components/icons/closeIcon";
import HeartFillIcon from "@/components/icons/heartFillIcon";
import InformationIcon from "@/components/icons/informationIcon";
import LocationIcon from "@/components/icons/locaionIcon";
import { IData } from "@/pages/swipe";
import { handleAge } from "@/utils/handleAge";
import Image from "next/image";
import { BiLoaderAlt } from "react-icons/bi";
import styles from "./user-card.module.scss";

interface IProps {
	user: IProfile;
	onSeen: (user: IData) => () => void;
	onLike: (_id: string) => void;
	onBlock: (_id: string) => void;
	distance: number;
}

export default function UserCard({ user, onBlock, onLike, onSeen, distance }: IProps) {
	if (!user) return null;

	return (
		<>
			<div className={styles.container}>
				<div className={`${styles.container__image} image-container`}>
					<Image
						objectPosition="center"
						className="image"
						alt="avatar"
						layout="fill"
						src={user.avatar ? user.avatar : "/assets/images/avatar.png"}
					/>
				</div>
				<div className={styles.container__content}>
					<div className={styles.container__content__box}>
						<h3>
							{user.name}, {handleAge(user.birthday)}t
						</h3>

						<button onClick={onSeen({ user, distance })}>
							<InformationIcon />
						</button>
					</div>

					<div className={styles.container__content__location}>
						<LocationIcon />
						<span className="text-caption-1 leading-caption-1">Cách {distance}m</span>
					</div>

					<div className={styles.container__content__boxButton}>
						<CircleButton
							IconLoading={<BiLoaderAlt className="animate-spin" />}
							Icon={<CloseIcon />}
							onClick={() => {
								onBlock(user.userId);
							}}
						/>
						<CircleButton
							IconLoading={<BiLoaderAlt className="animate-spin" />}
							Icon={<HeartFillIcon />}
							onClick={() => {
								onLike(user.userId);
							}}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
