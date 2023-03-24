import Button from "@/components/button/button";
import Conversation from "@/components/chat/convensation";
import Like from "@/components/chat/like/like";
import Title from "@/components/title";
import APP_PATH from "@/constant/appPath";
import { conversation, match } from "@/utils/data";
import { generateFullName } from "@/utils/generateFullname";
import Image from "next/image";
import { useRouter } from "next/router";
import "swiper/css";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./chat.module.scss";

export default function Chat() {
	const router = useRouter();

	const handleClick = (_id: string) => (): void => {
		router.push(`${APP_PATH.CHAT}/${_id}`);
	};

	const handleLike = (): void => console.log(1);

	return (
		<section className={`${styles.chat} container bg-white`}>
			<Title
				className={styles.chat__box}
				content={
					<div className={styles.chat__box__wrap}>
						<h2 className={styles.chat__box__wrap__title}>Trò chuyện</h2>
					</div>
				}
			/>
			<div className={styles.chat__boxFriend}>
				{match.length > 0 ? (
					<>
						<p className={styles.chat__boxFriend__title}>Danh sách bạn bè</p>
						<Swiper spaceBetween={16} slidesPerView={3.5}>
							{match.map((i: any) => (
								<SwiperSlide key={i.id} className="p-1">
									<Like avatar={i.avatar} onClick={handleLike} />
								</SwiperSlide>
							))}
						</Swiper>

						{/* conversation */}
						<h5 className={styles.chat__boxFriend__conversation__title}>Trò chuyện</h5>
						<ul className={styles.chat__boxFriend__conversation__box}>
							{conversation.map((item: any) => {
								if (item.messages.length > 0) {
									return (
										<Conversation
											name={generateFullName(item.users[0].name)}
											avatar={item.users[0].avatar}
											key={item.id}
											onClick={handleClick(item?.id)}
											lastMessage={item.messages[0] || undefined}
										/>
									);
								}
							})}
						</ul>
					</>
				) : (
					<div className={styles.chat__boxFriend__noFriend}>
						<div className={styles.chat__boxFriend__noFriend__content}>
							<Image
								src="/assets/images/no-friends.svg"
								width={200}
								height={200}
								alt="no-friend"
							/>
							<p className={styles.chat__boxFriend__noFriend__content__title}>
								Chưa có bạn bè nào
							</p>
						</div>
						<Button title="Tìm bạn ngay" onClick={() => router.push(APP_PATH.SWIPE)} />
					</div>
				)}
			</div>
		</section>
	);
}

Chat.protected = true;
