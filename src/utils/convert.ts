const convertReason = (reason: string) => {
	switch (reason) {
		case "DATE":
			return "Muốn hẹn hò";
		case "CHAT":
			return "Muốn tâm sự";
		case "FRIEND":
			return "Kết bạn bốn phương";
		default:
			break;
	}
};

const convertEducation = (education: string) => {
	switch (education) {
		case "HIGHER":
			return "Đại học";
		case "HIGH-SCHOOL":
			return "Trung học";
		default:
			break;
	}
};

const convertGender = (gender: string) => {
	switch (gender) {
		case "MALE":
			return "Nam";
		case "FEMALE":
			return "Nữ";
		default:
			return "Khác";
	}
};

export { convertEducation, convertGender, convertReason };
