import { useAppDispatch, useAppSelector } from "@/app/store";
import { CloseIcon, MatchTitleIcon, SendIconMatch } from "@/components/icons";
import { closeMatch, selectMatch } from "@/reducers/matchSlice";
import { getProfile } from "@/reducers/userAction";
import { toastError, toastSuccess } from "@/utils/toast";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import HeartContainer from "./heartWrapper";
import styles from "./match.module.scss";

export default function Matching() {
	const sMatch = useAppSelector(selectMatch).data;
	// const sUser = useAppSelector(selectUser);

	const [greetMessage, setGreetMessage] = useState<string>("");
	const router = useRouter();

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getProfile());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSend = async () => {
		try {
			router.push("/chat");
			toastSuccess("Gửi lời chào thành công");
			dispatch(closeMatch());
		} catch (error) {
			toastError((error as IResponseError).error);
		}
	};

	const handleSkip = async () => {
		try {
			toastSuccess("Bỏ qua thành công");
			dispatch(closeMatch());
		} catch (error) {
			toastError((error as IResponseError).error);
		}
	};

	const handleClose = async () => {
		try {
			// sMatch.data.forEach(async (item: any) => {
			// 	await dispatch(notificationUpdateSeenNotification(item._id)).unwrap();
			// });
			dispatch(closeMatch());
		} catch (error) {
			toastError((error as IResponseError).error);
		}
	};

	return (
		<section id="navbar" className={`${styles.container} animate-up`}>
			{sMatch ? (
				<div className={`${styles.container__box} matchingFrame`}>
					<button className={styles.container__box__btn} onClick={handleClose}>
						<CloseIcon />
					</button>

					<div className={styles.container__content}>
						{sMatch && <HeartContainer key={1} id="1" user={sMatch && sMatch} />}
						<div className={styles.container__content__boxTitle}>
							<MatchTitleIcon
								className={`${styles.container__content__boxTitle____icon} match-title`}
							/>
							<p className={styles.container__content__boxTitle__title}>
								Đừng để người ấy phải đợi, <br />
								gửi lời chào ngay!
							</p>
						</div>
						<div className={styles.container__content__boxForm}>
							<form className={styles.container__content__boxForm__form}>
								<input
									className={styles.container__content__boxForm__form__input}
									type="text"
									onChange={(e) => setGreetMessage(e.target.value)}
									value={greetMessage}
									placeholder="Gửi lời chào"
									maxLength={50}
									required
								/>
								<button
									type="submit"
									className={`${styles.container__content__boxForm__form__icon} bg-white`}
									onClick={handleSend}
								>
									<SendIconMatch />
								</button>
							</form>
							<button
								className={styles.container__content__boxForm__skipBtn}
								onClick={handleSkip}
							>
								Skip
							</button>
						</div>
					</div>
				</div>
			) : (
				""
			)}
		</section>
	);
}
