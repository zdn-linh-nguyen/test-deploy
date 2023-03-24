import { conversation } from "@/utils/data";
import { compareDateToMinutes, formatDateTime } from "@/utils/date";
import { Fragment } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import MessageItem from "../messageItem";
import styles from "./list-message.module.scss";

interface Props {
	userId?: string;
	className?: string;
	conversationId: string;
}

export default function ListMessage({ conversationId, className }: Props) {
	const res = conversation.find((item: any) => item._id === conversationId);

	return (
		<div
			id="scrollableDiv"
			style={{
				height: `${className}`,
			}}
			className={styles.container}
		>
			{res?.messages && (
				<InfiniteScroll
					dataLength={res.messages.length}
					next={() => {
						// const LIMIT = +(process.env.MESSAGE_LIMIT_DEFAULT as string);
						// if (res.next) {
						// 	fetchConversation(
						// 		res.page ? res.page + 1 : +(process.env.MESSAGE_PAGE_DEFAULT as string),
						// 		res.limit ? res.limit : LIMIT
						// 	);
						// }
					}}
					className={styles.container__infiniteScroll}
					inverse={true}
					// hasMore={res.next ? true : false}
					hasMore={res ? true : false}
					loader={<p className={styles.container__loader}>Đang tải...</p>}
					scrollableTarget="scrollableDiv"
				>
					{res.messages?.map((item: any, index: number) => {
						if (
							!compareDateToMinutes(
								new Date(item.createdAt),
								new Date(res?.messages[index + 1]?.createdAt)
							)
						) {
							return (
								<Fragment key={item._id}>
									<MessageItem isMe={item.senderId._id === "1"} messages={item.messages} />
									<p className={styles.container__infiniteScroll__time}>
										{formatDateTime(new Date(item.messages[0].createdAt))}
									</p>
								</Fragment>
							);
						}
						return (
							<Fragment key={item._id}>
								<MessageItem isMe={item.senderId._id === "1"} messages={item.messages} />
							</Fragment>
						);
					})}
				</InfiniteScroll>
			)}
		</div>
	);
}
