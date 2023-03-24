import photoAPI from "@/api/photoApi";
import CircleButton from "@/components/button/circleButton";
import {
	AlcoholIcon,
	CloseIcon,
	EducationIcon,
	HeightIcon,
	QuoteLeftIcon,
	ReligionIcon,
	SexIcon,
} from "@/components/icons";
import ArrowDownSolidIcon from "@/components/icons/arrowDownSolidIcon";
import HeartFillIcon from "@/components/icons/heartFillIcon";
import LocationIcon from "@/components/icons/locaionIcon";
import Info from "@/components/info/info";
import Interests from "@/components/interests/interests";
import { LazyLoadingImage } from "@/components/loading/lazy";
import { convertEducation, convertGender, convertReason } from "@/utils/convert";
import { handleAge } from "@/utils/handleAge";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import styles from "./swipe-item.module.scss";

interface IProps {
	data: {
		user: IProfile;
		distance: number;
	};
	isLoading?: boolean;
	onClose: () => void;
	onLike: (id: string) => void;
	onBlock: (id: string) => void;
}

export default function SwipeItem({ isLoading, data, onClose, onLike, onBlock }: IProps) {
	const [photo, setPhoto] = useState<IPhoto[]>([]);

	useEffect(() => {
		async function getUserPhoto() {
			const res = await photoAPI.getTinderPhotos(data.user.userId);
			setPhoto(res.data);
		}
		getUserPhoto();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<section key={data.user.userId} className={`${styles.swipe} container bg-white animate-up `}>
			<div className={styles.swipe__box}>
				<CircleButton
					IconLoading={<BiLoaderAlt className="animate-spin" />}
					Icon={<CloseIcon />}
					onClick={() => {
						onBlock(data.user.userId);
						onClose();
					}}
					disabled={isLoading}
				/>
				<CircleButton
					IconLoading={<BiLoaderAlt className="animate-spin" />}
					Icon={<HeartFillIcon />}
					onClick={() => {
						onLike(data.user.userId);
						onClose();
					}}
					disabled={isLoading}
				/>
			</div>
			<button onClick={onClose} className={styles.swipe__btn}>
				<div className={styles.swipe__btn__icon}>
					<ArrowDownSolidIcon />
				</div>
			</button>
			<div className={styles.swipe__info}>
				<div className="image-container">
					<div className={styles.swipe__info__boxImage}>
						<Image
							id="avatar"
							className={`${styles.swipe__info__boxImage__image} `}
							alt="avatar"
							layout="fill"
							src={data.user.avatar ? data.user.avatar : "/assets/images/avatar.png"}
						/>
					</div>
				</div>
				<div className={styles.swipe__info__about}>
					{/* name + location */}
					<div className={styles.swipe__info__about__location}>
						<h3>
							{data.user.name}, {handleAge(data.user.birthday)}t
						</h3>
						<div>
							<LocationIcon />
							<span>Cách {data.distance}m</span>
						</div>
					</div>

					{/* Introduction self, information and interests of user */}
					<div className={styles.swipe__info__about__intro}>
						<div className={styles.swipe__info__about__intro__bio}>
							<QuoteLeftIcon />
							<p>{convertReason(data.user.reason) || "Không có giới thiệu"}</p>
						</div>

						{/* Infor of user */}
						<div className={styles.swipe__info__about__intro__tinder}>
							<h5>Thông tin của {data.user.name}</h5>
							<div>
								{data.user.gender && (
									<Info title={convertGender(data.user.gender)} Icon={<SexIcon />} />
								)}
								{data.user.education && (
									<Info
										title={convertEducation(data.user.education) as string}
										Icon={<EducationIcon />}
									/>
								)}
								{data.user.drinking && (
									<Info
										title={data.user.drinking ? "Có" : "Không"}
										Icon={<AlcoholIcon />}
									/>
								)}
								{data.user.height && (
									<Info title={data.user.height.toString() + "m"} Icon={<HeightIcon />} />
								)}
								<Info
									title={data.user.religion ? "Có" : "Không có tôn giáo"}
									Icon={<ReligionIcon />}
								/>
							</div>
						</div>

						{/* Interests of user */}
						<div className={styles.swipe__info__about__intro__interests}>
							<h5>Tôi thích...</h5>
							<div>
								{data.user.interests?.length ? (
									data.user.interests.map((item) => <Interests key={item} title={item} />)
								) : (
									<p>Không có thông tin</p>
								)}
							</div>
						</div>
					</div>
				</div>

				{/* favorite images of user */}
				<div className="image-container">
					{photo?.map((image) => {
						if (image.isFavorite) {
							return (
								<LazyLoadingImage
									key={image.id}
									src={image.photoUrl}
									alt="favoriteImage"
									className={`${styles.swipe__info__img}`}
									width="100%"
									height="100%"
								/>
							);
						}
					})}
				</div>
			</div>
		</section>
	);
}
