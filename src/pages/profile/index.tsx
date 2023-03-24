import { useAppDispatch, useAppSelector } from "@/app/store";
import {
  AlcoholIcon,
  EducationIcon,
  GenderIcon,
  HeightIcon,
  ReligionIcon,
  UploadImageIcon,
} from "@/components/icons";
import Interests from "@/components/interests/interests";
import { LazyLoadingImage } from "@/components/loading/lazy";
import AlbumsItem from "@/components/profile/albumItem";
import BioDialog from "@/components/profile/dialog/bio";
import HeightDialog from "@/components/profile/dialog/height";
import InterestsDiaLog from "@/components/profile/dialog/interests";
import WhyDialog from "@/components/profile/dialog/whyHere";
import DoubleGroup from "@/components/profile/doubleGroup";
import Setting from "@/components/profile/setting";
import SingleGroup from "@/components/profile/singleGroup";
import Title from "@/components/title";
import APP_PATH from "@/constant/appPath";
import { getListPhoto } from "@/reducers/photoAction";
import { selectPhoto } from "@/reducers/photoSlice";
import { getProfile } from "@/reducers/userAction";
import { selectUser } from "@/reducers/userSlice";
import { convertGender, convertReason } from "@/utils/convert";
import {
  drinkingOptions,
  educationOptions,
  genderOptions,
  religionOptions,
} from "@/utils/data";
import { handleAge } from "@/utils/handleAge";

import { toastError, toastSuccess } from "@/utils/toast";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HiPencil } from "react-icons/hi";
import profileAPI from "../../api/profileApi";
import styles from "./profile.module.scss";

export default function Profile() {
	const sUser = useAppSelector(selectUser);
	const sPhoto = useAppSelector(selectPhoto);

	const [isOpenWhyDialog, setIsOpenWhyDialog] = useState<boolean>(false);
	const [isOpenBioDialog, setIsOpenBioDialog] = useState<boolean>(false);
	const [isOpenHeightDialog, setIsOpenHeightDialog] = useState<boolean>(false);
	const [isOpenInterestsDialog, setIsOpenInterestsDialog] = useState(false);

	const router = useRouter();
	const dispatch = useAppDispatch();

	const handleUpdateInfo = (): void => {
		router.push(APP_PATH.UPDATE_COMMON_INFO);
	};
	const handleUploadFile = (): void => {
		router.push(APP_PATH.UPLOAD_IMAGE);
	};

	const handleViewAlbums = (): void => {
		router.push(APP_PATH.ALBUMS);
	};

	const handleOpenWhyDialog = (): void => setIsOpenWhyDialog(true);
	const handleCloseWhyDialog = (): void => setIsOpenWhyDialog(false);

	const handleOpenBioDialog = (): void => setIsOpenBioDialog(true);
	const handleCloseBioDialog = (): void => setIsOpenBioDialog(false);

	const handleOpenHeightDialog = (): void => setIsOpenHeightDialog(true);
	const handleCloseHeightDialog = (): void => setIsOpenHeightDialog(false);

	const handleOpenInterestsDialog = (): void => setIsOpenInterestsDialog(true);
	const handleCloseInterestsDialog = (): void => setIsOpenInterestsDialog(false);

	// Call API For Profile
	useEffect(() => {
		dispatch(getListPhoto());
		dispatch(getProfile());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<BioDialog isOpen={isOpenBioDialog} onClose={handleCloseBioDialog} bio={sUser.description} />
			<WhyDialog isOpen={isOpenWhyDialog} onClose={handleCloseWhyDialog} reason={sUser.reason} />
			<InterestsDiaLog
				isOpen={isOpenInterestsDialog}
				onClose={handleCloseInterestsDialog}
				interests={sUser.interests}
			/>
			<HeightDialog
				isOpen={isOpenHeightDialog}
				onClose={handleCloseHeightDialog}
				height={sUser.height}
			/>

			<section className={`${styles.profile} container bg-white`}>
				<Title
					className={styles.profile__box}
					content={
						<div className={styles.profile__box__wrap}>
							<h2>Tài khoản</h2>
							<Setting />
						</div>
					}
				/>
				<div className={styles.profile__content}>
					<div className={styles.profile__content__info}>
						<LazyLoadingImage
							src={sUser.avatar ? sUser.avatar : "/assets/images/avatar.png"}
							alt="avatar"
							className={styles.profile__content__info__img}
							width={40}
							height={40}
						/>
						<div className={styles.profile__content__info__name}>
							<h3 className={styles.profile__content__info__name__title}>
								{sUser.name}, {handleAge(sUser.birthday)}
							</h3>
							<span className={styles.profile__content__info__name__reason}>
								{sUser.reason ? `"${convertReason(sUser.reason)}"` : ""}
							</span>
						</div>
					</div>
					<button onClick={handleUpdateInfo}>
						<HiPencil fill="#7a56fe" size={24} />
					</button>
				</div>

				<div className={styles.profile__boxImage}>
					{sPhoto.map((image, index, albums) =>
						index === 0 ? (
							<AlbumsItem
								key={image.publicId}
								url={image.photoUrl}
								firstImage
								onClick={handleViewAlbums}
							/>
						) : index > 0 && index < 4 ? (
							<AlbumsItem
								key={image.publicId}
								url={image.photoUrl}
								middleImage
								onClick={handleViewAlbums}
							/>
						) : (
							index === 4 && (
								<AlbumsItem
									key={image.publicId}
									url={image.photoUrl}
									anotherImages={albums.length - 5}
									onClick={handleViewAlbums}
								/>
							)
						)
					)}

					<div onClick={handleUploadFile} className={styles.profile__boxImage__upload}>
						<UploadImageIcon />
						<span>Tải ảnh lên</span>
					</div>
				</div>
				<div className={styles.profile__bio}>
					<DoubleGroup
						title="Tại sao bạn lại ở đây"
						desc={sUser.reason ? (convertReason(sUser.reason) as string) : "Vui lòng chọn"}
						onClick={handleOpenWhyDialog}
					/>
					<DoubleGroup
						title="Giới thiệu bản thân"
						desc={
							sUser.description
								? sUser.description
								: "Hãy thêm giới thiệu về bản thân bạn Hãy thêm giới thiệu về bản thân bạn Hãy thêm giới thiệu về bản thân bạn"
						}
						onClick={handleOpenBioDialog}
					/>
				</div>
				 <div className={styles.profile__more}>
          <SingleGroup
            icon={<AlcoholIcon />}
            title="Rượu bia"
            desc={
              sUser.drinking
                ? "Có"
                : sUser.drinking === false
                ? "Không"
                : "Vui lòng chọn"
            }
            options={drinkingOptions}
            onChange={(value: string) => {
              try {
                profileAPI.updateProfile({
                  drinking: value === "YES" ? true : false,
                });
                toastSuccess("Cập nhật thông tin thành công!");
              } catch (err) {
                toastError("Cập nhật thông tin thất bại!");
              }
            }}
          />
          <SingleGroup
            icon={<GenderIcon />}
            title="Giới tính"
            desc={sUser.gender ? convertGender(sUser.gender) : "Vui lòng chọn"}
            options={genderOptions}
            onChange={(value: string) => {
              try {
                profileAPI.updateProfile({ gender: value });
                toastSuccess("Cập nhật thông tin thành công!");
              } catch (err) {
                toastError("Cập nhật thông tin thất bại!");
              }
            }}
          />
          <SingleGroup
            icon={<ReligionIcon />}
            title="Tôn giáo"
            desc={sUser.religion !== "" ? sUser.religion : "Không"}
            options={religionOptions}
            onChange={(value: string) => {
              try {
                profileAPI.updateProfile({ religion: value });
                toastSuccess("Cập nhật thông tin thành công!");
              } catch (err) {
                toastError("Cập nhật thông tin thất bại!");
              }
            }}
          />
          <SingleGroup
            icon={<EducationIcon />}
            title="Học vấn"
            desc={sUser.education ? sUser.education : "Không"}
            options={educationOptions}
            onChange={(value: string) => {
              try {
                profileAPI.updateProfile({ education: value });
                toastSuccess("Cập nhật thông tin thành công!");
              } catch (err) {
                toastError("Cập nhật thông tin thất bại!");
              }
            }}
          />
          <SingleGroup
            icon={<HeightIcon />}
            title="Chiều cao"
            desc={sUser.height ? sUser.height + "cm" : "Cập nhật chiều cao"}
            onClick={handleOpenHeightDialog}
            isHeight
          />
        </div>

				<div className={styles.profile__interests}>
					<div className={styles.profile__interests__container}>
						<h5>Sở thích</h5>
						<button onClick={handleOpenInterestsDialog}>Chỉnh sửa</button>
					</div>
					<div className={styles.profile__interests__list}>
						{sUser.interests ? (
							sUser.interests.map((interest, i) => <Interests key={i} title={interest} />)
						) : (
							<>
								<Interests title="Chưa có sở thích" />
							</>
						)}
					</div>
				</div>
			</section>
		</>
	);
}

Profile.protected = true;
