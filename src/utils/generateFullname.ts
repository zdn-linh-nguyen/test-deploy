import { IUserName } from "@/types/interface";

export const generateFullName = (name: IUserName) => {
	return `${name.firstName} ${name.lastName}`;
};
