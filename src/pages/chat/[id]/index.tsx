import ListMessage from "@/components/chat/listMessage";
import Plus from "@/components/chat/plus";
import Drop from "@/components/dropdown";
import { ArrowLeft, ArrowRightIcon, HeartCircleIcon, SendIcon, SetIcon } from "@/components/icons";
import Title from "@/components/title";
import APP_PATH from "@/constant/appPath";
import { conversation } from "@/utils/data";
import { EmojiStyle } from "emoji-picker-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import TimeAgo from "timeago-react";
import styles from "./chat-id.module.scss";
const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });

interface IEmoji {
	emoji: string;
}

export default function Room() {
	const [message, setMessage] = useState<string>("");
	const [files, setFiles] = useState<File[]>([]);
	const [audioFile, setAudioFile] = useState<File>();
	const [isFriendOnline, setIsFriendOnline] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [isShowEmoji, setIsShowEmoji] = useState<boolean>(false);

	const router = useRouter();
	const { id } = router.query;

	const res = conversation.find((item: any) => item._id === id);

	const lastLogin = "111a";

	const onEmojiClick = (event: IEmoji) => {
		setMessage(message + event.emoji);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	const handleOpenEmoji = (): void => setIsShowEmoji(!isShowEmoji);

	const onBack = (): void => {
		router.push(APP_PATH.CHAT);
	};

	const classBoxChat = () => {
		let className = "[calc(100vh - 223px)]";
		if (files.length !== 0) {
			className = "[calc(100vh - 287px)]";
		}
		if (audioFile) {
			className = "[calc(100vh - 271px)]";
		}
		if (files.length !== 0 && audioFile) {
			className = "[calc(100vh - 335px)]";
		}
		return className;
	};

	return (
		<section className={`${styles.room} container bg-white`}>
			<Title
				className={styles.room__title}
				content={
					<div className={styles.room__title__container}>
						<div onClick={onBack}>
							<ArrowLeft />
						</div>
						<Drop />
					</div>
				}
			/>

			<div className={styles.room__info}>
				<div className={styles.room__info__container}>
					<div className={`${styles.room__info__container__boxImage} image-container`}>
						<Image
							className="image"
							src={res?.users[0].avatar ? res?.users[0].avatar : "/assets/images/avatar.png"}
							alt="avatar"
							layout="fill"
						/>
						<div className={styles.room__info__container__boxImage__heart}>
							<HeartCircleIcon />
						</div>
					</div>
					<div className={styles.room__info__container__name}>
						<p className={styles.room__info__container__name__title}>Linh</p>
						<span className={styles.room__info__container__name__status}>
							{isFriendOnline ? (
								<span className={styles.room__info__container__name__status__online}>
									<span>Đang trực tuyến</span>
								</span>
							) : (
								<>
									Hoạt động <TimeAgo datetime={lastLogin} locale="vi" />
								</>
							)}
						</span>
					</div>
				</div>
				<ArrowRightIcon />
			</div>

			{res && (
				<ListMessage
					className={classBoxChat()}
					// userId={sUser.data?._id}
					conversationId={res.id}
				/>
			)}

			<form className={styles.room__chat} onSubmit={handleSubmit}>
				{/* plus for more media */}
				<Plus files={files} setFiles={setFiles} setAudioFile={setAudioFile} />

				{/* input message */}
				<div className={styles.room__chat__message}>
					<input
						type="text"
						className={styles.room__chat__message__input}
						autoFocus
						placeholder="Aa"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						required={files.length === 0 && !audioFile}
					/>

					<div className={styles.room__chat__message__setIcon}>
						<button onClick={handleOpenEmoji}>
							<SetIcon />
						</button>
						<div
							className={styles.room__chat__message__setIcon__emoji}
							style={isShowEmoji ? { display: "block" } : { display: "none" }}
						>
							<Picker
								// preload
								onEmojiClick={onEmojiClick}
								skinTonesDisabled
								height={400}
								emojiStyle={EmojiStyle.NATIVE}
								// disableSkinTonePicker
								// disableAutoFocus
							/>
						</div>
					</div>
				</div>

				{/* <Popover className="relative flex-center">
						{({ open }) => (
							<>
								<Popover.Button>
									<IconSetIcon />
								</Popover.Button>
								{open && (
									<Popover.Panel
										className={`${
											open ? "block" : "hidden"
										} absolute right-0 z-10 bottom-[calc(100%+1rem)]`}
										static
									>
										<Picker
											preload
											onEmojiClick={onEmojiClick}
											disableSearchBar
											disableSkinTonePicker
											disableAutoFocus
										/>
									</Popover.Panel>
								)}
							</>
						)}
					</Popover> */}

				<button
					className={styles.room__chat__send}
					type="submit"
					disabled={(!message && !files.length && !audioFile) || isLoading}
				>
					{isLoading ? <BiLoaderAlt className="animate-spin" /> : <SendIcon />}
				</button>
			</form>
		</section>
	);
}

Room.protected = true;
Room.getLayout = function getLayout(page: ReactElement) {
	return <>{page}</>;
};
