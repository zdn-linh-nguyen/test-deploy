import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import { FaBan, FaUsersSlash } from "react-icons/fa";
import ThreeDotIcon from "../icons/threeDotIcon";
import styles from "./dropdown.module.scss";

export default function Drop() {
	const handleUnfriend = () => console.log(1);
	const handleBlock = () => console.log(2);

	const items: MenuProps["items"] = [
		{
			key: "1",
			label: (
				<button onClick={handleUnfriend} className={styles.btn__container}>
					<FaUsersSlash className={styles.btn__container__icon} />
					<p>Huỷ kết bạn</p>
				</button>
			),
		},
		{
			key: "2",
			label: (
				<button onClick={handleBlock} className={styles.btn__container}>
					<FaBan className={styles.btn__container__icon} />
					<p>Chặn</p>
				</button>
			),
		},
	];

	return (
		<Dropdown menu={{ items }} placement="bottomRight" arrow={{ pointAtCenter: true }}>
			<button className={styles.btn__dot}>
				<ThreeDotIcon />
			</button>
		</Dropdown>
	);
}
