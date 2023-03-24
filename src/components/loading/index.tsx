import styles from "./loading.module.scss";

interface Props {}

export default function Loading(props: Props) {
	return (
		<section className={styles.container}>
			<div className={styles.container__content}>
				<p className={styles.container__content__title}>Cupidify</p>
			</div>
		</section>
	);
}
