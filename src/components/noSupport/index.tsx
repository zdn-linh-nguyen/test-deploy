import Image from "next/image";
import styles from "./no-support.module.scss";

interface Props {}

export default function NotSupport(props: Props) {
	return (
		<div className={styles.container}>
			<h1 className={styles.container__title}>Thiết bị của bạn không hỗ trợ ứng dụng này</h1>
			<div className={`${styles.container__boxImg} image-container`}>
				<Image
					src="/assets/images/not-support.png"
					alt="not-support-device"
					layout="fill"
					objectFit="contain"
				/>
			</div>
		</div>
	);
}
