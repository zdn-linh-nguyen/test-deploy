import { RegisterOptions, UseFormRegister } from "react-hook-form";
import styles from "./input-field.module.scss";

interface IProps {
	label: string;
	placeholder: string;
	type?: "text" | "email";
	disabled?: boolean;
	name: string;
	register: UseFormRegister<any>;
	option?: RegisterOptions;
	error?: string;
	defaultValue?: string | number;
}

export default function InputField({
	name,
	label,
	placeholder,
	type = "text",
	register,
	option,
	disabled,
	error,
	defaultValue,
}: IProps) {
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<label htmlFor={label}>
					<span className={styles.content__title}>{label}</span>
					{option?.required && <span className={styles.content__danger}>*</span>}
				</label>
				<input
					id={label}
					className={styles.content__input}
					type={type}
					placeholder={placeholder}
					disabled={disabled}
					defaultValue={defaultValue}
					{...register(name, { ...option })}
				/>
			</div>
			{error && <p className={styles.container__error}>{error}</p>}
		</div>
	);
}
