import Image from "next/image";
import TimeAgo from "timeago-react";
import * as timeago from "timeago.js";
import vi from "timeago.js/lib/lang/vi";
timeago.register("vi", vi);

import { IMessage } from "@/types/message";
import styles from "./convensation.module.scss";

interface Props {
	name: string;
	avatar: string;
	onClick?: () => void;
	lastMessage?: IMessage;
}

export default function Conversation({ name, avatar, onClick, lastMessage }: Props) {
	return (
		<li className={styles.container} onClick={onClick}>
			<div className={styles.container__box}>
				<div className={`${styles.container__box__avatar} image-container`}>
					<Image className="image" src={avatar} alt="avatar_img" layout="fill" />
				</div>
				<div className={styles.container__box__content}>
					<p className={styles.container__box__content__title}>{name}</p>
					{lastMessage && (
						<span className={styles.container__box__content__message}>
							{lastMessage.senderId.id === "" ? "Bạn: " : ""}
							{lastMessage.senderId.id && "Bạn: "}
							{lastMessage.messages[0].type === "text"
								? lastMessage.messages[0].value
								: lastMessage.messages[0].type === "image"
								? "📷"
								: "🔊"}
						</span>
					)}
				</div>
			</div>
			{lastMessage && (
				<div className={styles.container__timeAgo}>
					<TimeAgo datetime={new Date(lastMessage?.updatedAt)} locale="vi" />
				</div>
			)}
		</li>
	);
}
