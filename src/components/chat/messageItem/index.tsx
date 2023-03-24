import { IMessageItem } from "@/types/message";
// import Image from "next/image";
import Image from "next/image";
import styles from "./message-item.module.scss";

interface IProps {
	messages: IMessageItem[];
	isMe: boolean;
}

interface ITextContainer {
	message: IMessageItem;
	index: number;
	isMe?: boolean;
}

enum MessageType {
	TEXT = "text",
	IMAGE = "image",
	AUDIO = "audio",
}

const TextContainer = ({ message, index, isMe }: ITextContainer) => {
	return (
		<div className={!isMe ? styles.textContainer : styles.textContainer__notMe} key={index}>
			<p className={!isMe ? styles.textContainer__title : styles.textContainer__notMe__title}>
				{message.value}
			</p>
		</div>
	);
};

const ImageContainer = ({ message, index, isMe }: ITextContainer) => {
	const classMessage =
		message.value.length === 1
			? "repeat(1, 1fr)"
			: !(message.value.length % 2)
			? "repeat(2, 1fr)"
			: "repeat(3, 1fr)";
	return (
		<div className={isMe ? styles.imageContainer : styles.imageContainer__notMe} key={index}>
			{(message.value as []).map((image) => (
				<div
					key={image}
					style={{ gridTemplateColumns: classMessage }}
					className={`${styles.imageContainer__content} image-container`}
				>
					<Image className="image" src={image} alt="img" layout="fill" priority />
				</div>
			))}
		</div>
	);
};

const VideoContainer = ({ message, index, isMe }: ITextContainer) => {
	return (
		<div className={isMe ? styles.videoContainer : styles.videoContainer__notMe} key={index}>
			<audio controls className={`${styles.videoContainer__content} audio`}>
				<source src={message.value as string} type="audio/mpeg" />
			</audio>
		</div>
	);
};

const MessageItem = ({ messages, isMe }: IProps) => {
	return (
		<>
			{isMe ? (
				<>
					{messages?.map((message, index) =>
						message.type === MessageType.TEXT ? (
							<TextContainer message={message} key={index} index={index} />
						) : message.type === MessageType.IMAGE ? (
							<ImageContainer message={message} key={index} index={index} />
						) : (
							message.type === MessageType.AUDIO && (
								<VideoContainer message={message} key={index} index={index} />
							)
						)
					)}
				</>
			) : (
				<>
					{messages?.map((message, index) =>
						message.type === MessageType.TEXT ? (
							<TextContainer message={message} key={index} index={index} />
						) : message.type === MessageType.IMAGE ? (
							<ImageContainer message={message} key={index} index={index} />
						) : (
							message.type === MessageType.AUDIO && (
								<VideoContainer message={message} key={index} index={index} />
							)
						)
					)}
				</>
			)}
		</>
	);
};

export default MessageItem;
