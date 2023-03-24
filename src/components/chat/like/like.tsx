import Image from "next/image";
import { AiFillHeart } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import styles from "./like.module.scss";

interface Props {
	avatar: string;
	onClick: () => void;
}

export default function LikeAvatar({ avatar, onClick }: Props) {
	function handleClick() {
		onClick();
	}
	return (
		<button className={styles.btn} onClick={handleClick}>
			<div className={`${styles.btn__container} image-container`}>
				<Image className="image" src={avatar} alt="avatar_img" layout="fill" />
			</div>
			<div className={styles.btn__content}>
				<IoClose className={styles.btn__content__icon} />
				<AiFillHeart className={styles.btn__content__icon} />
			</div>
		</button>
	);
}
