import { SettingIcon } from "@/components/icons";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import { RiLogoutCircleRLine } from "react-icons/ri";
import styles from "./setting.module.scss";

export default function Setting() {
	const handleLogout = (): void => {
		localStorage.removeItem("token");
	};

	const items: MenuProps["items"] = [
		{
			key: "1",
			label: (
				<button onClick={handleLogout} className={styles.btn__container}>
					<RiLogoutCircleRLine className={styles.btn__container__icon} />
					<p>Đăng xuất</p>
				</button>
			),
		},
	];

	return (
		<Dropdown menu={{ items }} placement="bottomRight" arrow={{ pointAtCenter: true }}>
			<button className={styles.btn__setting}>
				<SettingIcon />
			</button>
		</Dropdown>
	);
}
