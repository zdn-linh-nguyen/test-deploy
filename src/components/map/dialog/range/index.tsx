import mapAPI from "@/api/mapApi";
import { useAppDispatch } from "@/app/store";
import Button from "@/components/button/button";
import Dialog from "@/components/dialog";
import { setRange } from "@/reducers/rangeSlice";
import { Col, InputNumber, Row, Slider } from "antd";
import { useState } from "react";
import styles from "./range.module.scss";

interface Props {
	range: number;
	isOpen: boolean;
	onClose: () => void;
}

export default function RangeDialog({ isOpen, onClose, range }: Props) {
	const dispatch = useAppDispatch();

	const [inputValue, setInputValue] = useState<number | null>(range);

	const onChange = (newValue: number | null) => {
		setInputValue(newValue);
	};

	const handleSubmitFindUser = async () => {
		if (!inputValue) return;
		dispatch(setRange({ range: inputValue }));
		mapAPI.getLocation(inputValue);

		onClose();
	};

	return (
		<>
			<Dialog title="Tìm bạn trong khoảng cách (m)" isOpen={isOpen} onClose={onClose}>
				<Row className={styles.sliderRow}>
					<Col span={16}>
						<Slider
							min={0}
							max={10000}
							onChange={onChange}
							defaultValue={range}
							value={typeof inputValue === "number" ? inputValue : 0}
						/>
					</Col>
					<Col span={4}>
						<InputNumber
							min={0}
							max={10000}
							style={{ margin: "0 16px" }}
							defaultValue={range}
							value={inputValue}
							onChange={onChange}
						/>
					</Col>
				</Row>
				<Button
					block
					title="Tìm kiếm"
					type="secondary"
					className={styles.btn}
					onClick={handleSubmitFindUser}
				/>
			</Dialog>
		</>
	);
}
