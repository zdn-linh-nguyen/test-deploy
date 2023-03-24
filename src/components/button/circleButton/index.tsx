import styles from "./circle-button.module.scss";

interface IProps {
	Icon: JSX.Element;
	IconLoading: JSX.Element;
	onClick: () => void;
	disabled?: boolean;
}

export default function CircleButton({ Icon, IconLoading, onClick, disabled }: IProps) {
	return (
		<button className={styles.container} onClick={onClick} disabled={disabled}>
			{disabled ? IconLoading : Icon}
		</button>
	);
}
