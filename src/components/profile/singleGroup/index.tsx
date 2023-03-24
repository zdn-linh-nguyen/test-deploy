import { ArrowRightIcon } from "@/components/icons";
import styles from "./single-group.module.scss";

import { Select } from "antd";
import { useEffect, useState } from "react";

interface Props {
	className?: string;
	title: string;
	desc: string;
	icon: React.ReactNode;
	isHeight?: boolean;
	onClick?: () => void;
	options?: {
		_id: number;
		value: string;
		label: string;
	}[];
	onChange?: (value: string) => void;
}

export default function SingleGroup({
	icon,
	className = "",
	title,
	desc,
	onClick,
	onChange,
	options,
	isHeight,
}: Props) {
	const [description, setDescription] = useState<string>(desc);

	useEffect(() => {
		setDescription(desc);
	}, [desc]);

	const handleChange = (value: string) => {
		setDescription(value);
		onChange && onChange(value);
	};

	return (
		<>
			<button className={`${className} ${styles.container}`} onClick={onClick}>
				<div className={styles.container__boxTitle}>
					{icon}
					<span className={styles.container__boxTitle__title}>{title}</span>
				</div>
				{isHeight ? (
					<div className={styles.container__boxSub}>
						<span className={styles.container__boxSub__sub}>{description}</span>
						<ArrowRightIcon className="scale-75" />
					</div>
				) : (
					<Select
						onChange={handleChange}
						value={description}
						suffixIcon={<ArrowRightIcon className="scale-75" />}
						bordered={false}
						className={styles.container__boxTitle__select}
					>
						{options?.map((option) => (
							<option key={option._id} value={option.value}>
								{option.label}
							</option>
						))}
					</Select>
				)}
			</button>
		</>
	);
}
