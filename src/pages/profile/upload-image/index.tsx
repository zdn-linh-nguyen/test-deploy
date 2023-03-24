import Button from "@/components/button/button";
import { ArrowLeft, UploadImageIcon } from "@/components/icons";
import AlbumsItem from "@/components/profile/albumItem";
import Title from "@/components/title";
import APP_PATH from "@/constant/appPath";
import { toastError } from "@/utils/toast";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { VscLoading } from "react-icons/vsc";
import photoAPI from "../../../api/photoApi";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { selectPhoto } from "../../../reducers/photoSlice";
import { toastSuccess } from "../../../utils/toast";
import styles from "./upload-img.module.scss";

export default function UploadImage() {
	const router = useRouter();
	const sPhoto = useAppSelector(selectPhoto);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [albums, setAlbums] = useState<File[]>([]);

	const uploadBtnRef = useRef<HTMLInputElement>(null);

	const dispatch = useAppDispatch();

	const [remainingImages, setRemainingImages] = useState<number>(
		sPhoto ? +(process.env.MAX_IMAGES_ALBUMS as string) - sPhoto.length : 0
	);

	const handleClick = (): void => {
		if (uploadBtnRef.current) {
			uploadBtnRef.current.click();
		}
	};

	const handleRemove = (index: number): void => {
		const newAlbums = [...albums];
		newAlbums.splice(index, 1);
		setAlbums(newAlbums);
		setRemainingImages(remainingImages + 1);
	};

	const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
		if (!e.target.files) {
			return;
		}

		const newAlbums: File[] = [];
		const filesLength = e.target.files.length;

		if (remainingImages < filesLength) {
			for (let index = 0; index < remainingImages; index++) {
				const file: File = e.target.files[index];
				if (file.type !== "image/png" && file.type !== "image/jpeg" && file.type !== "image/jpg") {
					toastError(file.name + " không phải kiểu ảnh được phép tải lên.");
				} else {
					newAlbums.push(file);
				}
			}

			setRemainingImages(0);
		} else {
			for (let index = 0; index < filesLength; index++) {
				const file: File = e.target.files[index];
				if (file.type !== "image/png" && file.type !== "image/jpeg" && file.type !== "image/jpg") {
					toastError(file.name + " không phải kiểu ảnh được phép tải lên.");
				} else {
					newAlbums.push(file);
				}
			}

			setRemainingImages(remainingImages - filesLength);
		}
		setAlbums((list) => [...list, ...newAlbums]);
	};

	const handleSubmit = async () => {
		if (albums.length === 0) {
			toastError("Vui lòng chọn ảnh để tải lên");
			return;
		}

		setIsLoading(true);
		const formData = new FormData();

		for (let image of albums) {
			formData.append("files", image);
		}
		//dispatch action
		try {
			const response = await photoAPI.uploadImages(formData);
			toastSuccess("Cập nhật ảnh thành công!");
			router.push(APP_PATH.PROFILE);
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

			{remainingImages > 0 ? (
				<p>Bạn có thể tải thêm {remainingImages} ảnh</p>
			) : (
				<p>Albums của bạn đã đầy</p>
			)}
			<div className={styles.container__content}>
				{albums &&
					albums.map((image, index) => {
						const url = URL.createObjectURL(image);

						return (
							<AlbumsItem
								key={image.lastModified + index}
								url={url}
								upLoad
								onClick={() => handleRemove(index)}
							/>
						);
					})}

				{remainingImages > 0 && (
					<div onClick={handleClick} className={styles.container__content__boxImage}>
						<UploadImageIcon />
						<span>Tải ảnh lên</span>
						<input
							type="file"
							name="albums"
							id="albums"
							multiple
							hidden
							accept="image/png, image/jpg, image/jpeg"
							ref={uploadBtnRef}
							onChange={handleFileInput}
						/>
					</div>
				)}
			</div>
			{!isLoading && sPhoto && sPhoto.length < +(process.env.MAX_IMAGES_ALBUMS as string) && (
				<Button
					onClick={handleSubmit}
					block
					disabled={sPhoto && sPhoto.length === 10 ? true : false}
					title="Lưu"
					type="secondary"
					className={styles.container__btn}
				/>
			)}
			{isLoading && (
				<button className={`${styles.container__btn} button-1 btn-md`}>
					<VscLoading className="animate-spin" />
				</button>
			)}
		</section>
	);
}

UploadImage.protected = true;
