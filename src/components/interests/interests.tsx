import styles from "./interests.module.scss";

interface Props {
	title: string;
}

export default function Interests({ title }: Props) {
	const random = Math.floor(Math.random() * 10);
	const bg = [
		"#FFF0F0",
		"#EDF7FF",
		"#FFF5ED",
		"#E9FBF1",
		"#F3D6D6",
		"#F9EDFF",
		"#FFEDF6",
		"#EDDEFF",
		"#E4DAE4",
		"#FFDEFC",
	];
	const randomBg = `${bg[random]}`;

	return (
		<div
			style={{
				backgroundColor: randomBg,
			}}
			className={styles.container}
		>
			<span className={styles.container__title}>#{title}</span>
		</div>
	);
}
