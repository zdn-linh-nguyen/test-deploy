import photoAPI from "@/api/photoApi";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { ArrowLeft } from "@/components/icons";
import AlbumsImage from "@/components/profile/albumImage";
import Title from "@/components/title";
import { deletePhoto, selectPhoto, updateStateFavorite } from "@/reducers/photoSlice";
import { updateProfileUser } from "@/reducers/userSlice";
import { toastError, toastSuccess } from "@/utils/toast";
import { useRouter } from "next/router";
import styles from "./albums.module.scss";

export default function Albums() {
	const router = useRouter();
	const sPhoto = useAppSelector(selectPhoto);
	const dispatch = useAppDispatch();

	const handleFavorite = (url: string) => async () => {
		// clean this code
		try {
			photoAPI.updateFavorite(url);
			const updatedPhoto = sPhoto.find((p) => p.publicId === url);
			if (updatedPhoto) {
				const newIsFavorite = !updatedPhoto.isFavorite;

				dispatch(
					updateStateFavorite({
						id: updatedPhoto.id,
						isFavorite: newIsFavorite,
					})
				);
			}
			toastSuccess("Favorite updated");
		} catch (error) {
			toastError((error as IResponseError).error);
		}
	};

	const handleSetAvatar = (url: string) => async () => {
		const updatedFields = {
			avatar: `/${url}`,
		};

		try {
			await dispatch(updateProfileUser(updatedFields));
			await photoAPI.updateAvatar(url);
			toastSuccess("Avatar đã được cập nhật");
			router.push("/profile");
		} catch (error) {
			toastError((error as IResponseError).error);
		}
	};

	const handleDelete = (url: string) => async () => {
		try {
			await photoAPI.removeImage(url);
			dispatch(deletePhoto(url));
			toastSuccess("Ảnh đã được xóa");
		} catch (error) {
			toastError((error as IResponseError).error);
		}
	};

	return (
		<section className={`${styles.container} container`}>
			<Title
				className={styles.container__title}
				content={
					<button className={styles.container__title__btn} onClick={() => router.back()}>
						<ArrowLeft />
					</button>
				}
			/>

			<div className={styles.container__content}>
				{sPhoto.map((item) => (
					<AlbumsImage
						key={item.photoUrl}
						url={item.photoUrl}
						isFavorite={item.isFavorite}
						onAvatar={handleSetAvatar(item.publicId)}
						onDelete={handleDelete(item.publicId)}
						onFavorite={handleFavorite(item.publicId)}
					/>
				))}
			</div>
		</section>
	);
}

Albums.protected = true;
