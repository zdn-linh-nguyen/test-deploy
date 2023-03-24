import userAPI from "@/api/userApi";
import { useAppDispatch } from "@/app/store";
import Button from "@/components/button/button";
import { ArrowLeftIcon, ArrowRightCircleIcon, PhoneIcon, VNFlagIcon } from "@/components/icons";
import Title from "@/components/title";
import { authentication } from "@/config/firebase/social-firebase-config";
import APP_PATH from "@/constant/appPath";
import { selectAuth, setRegister } from "@/reducers/authSlice";
import { toastError, toastSuccess } from "@/utils/toast";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, ReactElement, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./phone.module.scss";

export default function LoginPhone() {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const router = useRouter();
	const [phone, setPhone] = useState<string>("");

	const dispatch = useAppDispatch();
	const sAuth = useSelector(selectAuth);

	const handleChangePhone = (e: ChangeEvent<HTMLInputElement>): void => {
		setPhone(e.target.value);
	};

	//   Function handle Generate Recapcha before call return api
	const generateRecaptcha = (): void => {
		// create property for window --> verify user
		window.recaptchaVerifier = new RecaptchaVerifier(
			"recaptcha-container",
			{
				size: "invisible",
				callback: (response: any) => {
					onSignInSubmit(response);
				},
			},
			authentication
		);
	};

	//   function handle when verify recapcha
	const onSignInSubmit = (response: any): void => {
		if (response) {
			router.push(APP_PATH.AUTH_OTP);
		}
	};

	// Handle Confirm Result OTP
	const confirmResultHandle = (): void => {
		generateRecaptcha();
		const appVerifier: RecaptchaVerifier = window.recaptchaVerifier;
		signInWithPhoneNumber(authentication, `+84${phone}`, appVerifier)
			.then((confirmationResult) => {
				window.confirmationResult = confirmationResult;
			})
			.catch((error) => {
				toastError((error as Error).message);
			});
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const regex = /(0[3|5|7|8|9])+([0-9]{8})\b/g;

		if (!regex.test(phone)) {
			toastError("Số điện thoại không hợp lệ");
			return;
		}

		try {
			if (sAuth.type === "social_login" && phone !== sAuth.infoUser.phone) {
				toastError(`Số điện thoại không đúng cho email: ${sAuth.infoUser.email}`);
				return;
			}

			const res = await userAPI.checkPhone(phone);
			const isExistUser = res.data.checked;

			if (!isExistUser) {
				confirmResultHandle();
				dispatch(setRegister(phone));
				toastSuccess("Đang gửi OTP để đăng kí");
				setTimeout(() => {
					router.push(APP_PATH.AUTH_OTP);
				}, 1000);

				return;
			}

			confirmResultHandle();
		} catch (error) {
			toastError((error as Error).message);
		}
	};

	const handleClickBack = (): void => {
		router.push(APP_PATH.ROOT);
	};

	return (
		<section className="container bg-white">
			<div className={styles.content}>
				<Title
					className={styles.content__arrow}
					content={
						<button onClick={handleClickBack} className={styles.content__btn}>
							<ArrowLeftIcon />
						</button>
					}
				/>
				<form className={styles.content__body} id="phone" onSubmit={handleSubmit}>
					<div className={`${styles.content__body__phone} image-container`}>
						<PhoneIcon />
					</div>
					<div className={styles.content__body__wrap}>
						<h4>Nhập số điện thoại để tiếp tục</h4>
						<p>Vui lòng nhập số điện thoại để đăng nhập và kết bạn tại Cupidify</p>
					</div>
					<div className={styles.content__body__input}>
						<VNFlagIcon />
						<input
							value={phone}
							onChange={handleChangePhone}
							className="flex-1 bg-transparent"
							type="text"
							placeholder="Nhập số điện thoại"
							ref={inputRef}
						/>
					</div>
				</form>
				<Button
					className={styles.content__verify}
					title="Xác thực"
					icon={<ArrowRightCircleIcon />}
					block
					name="phone"
					htmlType="submit"
					form="phone"
				/>
			</div>
			<div id="recaptcha-container"></div>
		</section>
	);
}

LoginPhone.getLayout = function getLayout(page: ReactElement) {
	return <>{page}</>;
};

LoginPhone.protected = { isToken: true };
