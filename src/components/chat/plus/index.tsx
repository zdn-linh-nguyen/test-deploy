import { PlusIcon } from "@/components/icons";
import { toastError } from "@/utils/toast";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { BsFileMusic, BsImage } from "react-icons/bs";
import styles from "./plus.module.scss";
const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });

interface IProps {
	// setFiles: (files: File[]) => void;
	setAudioFile: (file: File) => void;
	setFiles: any;
	files: File[];
}

export default function Plus({ setFiles, setAudioFile, files }: IProps) {
	const inputRef = useRef<HTMLInputElement>(null);
	const inputAudioRef = useRef<HTMLInputElement>(null);

	const handleUpload = () => {
		if (inputRef.current) {
			inputRef.current.click();
		}
	};

	const handleUploadAudio = () => {
		if (inputAudioRef.current) {
			inputAudioRef.current.click();
		}
	};

	const handleChangeImgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			let pass = true;
			if (e.target.files.length + files.length > 5) {
				pass = false;
				toastError("Bạn chỉ được upload tối đa 5 file");
			}
			const newFiles = Array.from(e.target.files);
			newFiles.forEach((file) => {
				if (!file.type.includes("image")) {
					pass = false;
				}
			});
			if (pass) {
				setFiles([...files, ...newFiles]);
			}
		}
	};

	const handleChangeAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const newFile = e.target.files[0];
			if (!newFile.type.includes("audio")) {
				toastError("File không hợp lệ");
				return;
			}
			if (newFile.size > 10 * 1024 * 1024) {
				toastError("File không được lớn hơn 10MB");
				return;
			}
			setAudioFile(newFile);
		}
	};

	const items: MenuProps["items"] = [
		{
			key: "1",
			label: (
				<button onClick={handleUpload} className={styles.btn__item}>
					<BsImage className={styles.btn__item__icon} />
					<p>Tải lên</p>
				</button>
			),
		},
		{
			key: "2",
			label: (
				<button onClick={handleUploadAudio} className={styles.btn__item}>
					<BsFileMusic className={styles.btn__item__icon} />
					<p>Tải lên</p>
				</button>
			),
		},
	];

	return (
		<div className="">
			<input
				multiple
				ref={inputRef}
				className="hidden"
				type="file"
				name="file"
				id="file"
				onChange={handleChangeImgUpload}
				accept="image/*"
			/>
			<input
				multiple
				ref={inputAudioRef}
				className="hidden"
				type="file"
				name="mp3_file"
				id="mp3_file"
				onChange={handleChangeAudioUpload}
				accept="audio/*"
			/>
			<Dropdown menu={{ items }} placement="topLeft" arrow={{ pointAtCenter: true }}>
				<button className={styles.plus}>
					<PlusIcon />
				</button>
			</Dropdown>
		</div>
	);
}
