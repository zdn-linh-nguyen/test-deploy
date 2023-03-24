import authAPI from "@/api/authApi";
import Button from "@/components/button/button";
import { ArrowLeftIcon, ArrowRightCircleIcon, KeyIcon } from "@/components/icons";
import Title from "@/components/title";
import { authentication } from "@/config/firebase/social-firebase-config";
import APP_PATH from "@/constant/appPath";
import { selectAuth } from "@/reducers/authSlice";
import { toastError, toastSuccess } from "@/utils/toast";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import OtpInput from "react-otp-input";
import { useSelector } from "react-redux";
import styles from "./otp.module.scss";

export default function OtpVerify() {
	const router = useRouter();
	const [otp, setOtp] = useState<string>("");

	const authState = useSelector(selectAuth);

	const isLogin = authState.type === "login" || authState.type === "social_login" ? true : false;

	const handleChangeOtp = (value: string): void => {
		setOtp(value);
	};

	const loginHandle = async (phone: string, tokenOtp: string) => {
		try {
			const response = await authAPI.login(phone, tokenOtp);
			if (response.data.token) {
				localStorage.setItem("token", response.data.token);
				toastSuccess("Đăng nhập thành công");
				router.push(APP_PATH.SWIPE);
			}
		} catch (error) {
			toastError("OTP hết hạn"!);
		}
	};

	const handleSubmit = async () => {
		try {
			const confirmationResult = window.confirmationResult;
			const result = await confirmationResult.confirm(otp);
			const phone = result.user.phoneNumber.replace("+84", "0");

			if (isLogin) {
				loginHandle(phone, result._tokenResponse.idToken);
			} else {
				router.push(APP_PATH.AUTH_UPDATE);
			}
		} catch (error) {
			toastError("OTP không đúng");
		}
	};

	const resendOtpHandle = (): Promise<void> => confirmResultHandle();

	const handleClickBack = (): void => {
		router.push(APP_PATH.AUTH_PHONE);
	};

	const generateRecapcha = (): void => {
		window.recaptchaVerifier = new RecaptchaVerifier(
			"recaptcha-container",
			{
				size: "invisible",
				callback: (response: any) => {},
			},
			authentication
		);
	};

	const confirmResultHandle = async (): Promise<void> => {
		generateRecapcha();
		const appVerifier: RecaptchaVerifier = window.recaptchaVerifier;

		try {
			const confirmationResult = await signInWithPhoneNumber(
				authentication,
				`+84${authState.infoUser.phone}`,
				appVerifier
			);
			window.confirmationResult = confirmationResult;
		} catch (error) {
			toastError((error as Error).message);
		}
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
				<div className={styles.content__body}>
					<div className={`${styles.content__body__key} image-container`}>
						<KeyIcon />
					</div>
					<div className={styles.content__body__wrap}>
						<h4>Mã xác thực</h4>
						<p>
							Vui lòng nhập mã OTP được gửi về số điện thoại của bạn, để hoàn thành{" "}
							{isLogin ? "đăng nhập" : "đăng kí"} .
						</p>
						<div className={styles.content__body__wrap__inputOTP}>
							<OtpInput
								value={otp}
								onChange={handleChangeOtp}
								numInputs={6}
								isInputNum={true}
							/>
						</div>
					</div>
					<button onClick={resendOtpHandle} className={styles.content__body__resend}>
						Gửi lại OTP
					</button>
				</div>
				<Button
					className={styles.content__verify}
					title="Tiếp tục"
					icon={<ArrowRightCircleIcon />}
					block
					onClick={handleSubmit}
				/>
			</div>
			<div id="recaptcha-container"></div>
		</section>
	);
}

OtpVerify.getLayout = function getLayout(page: ReactElement) {
	return <>{page}</>;
};

OtpVerify.protected = { isToken: true };
