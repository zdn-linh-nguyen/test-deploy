import { IUserRegister } from "../types/interface";
import { mainAxios } from "./axiosConfig";
const ENDPOINT = `auth`;

const authAPI = {
	register: (user: IUserRegister) => {
		return mainAxios.post(`${ENDPOINT}/signup`, {
			...user,
		});
	},
	login: (phone: string, tokenOtp: string) => {
		return mainAxios.post(`${ENDPOINT}/login`, {
			phone,
			token: tokenOtp,
		});
	},
	loginNotOtp: (phone: string) => {
		return mainAxios.post(`${ENDPOINT}/login-otp`, {
			phone,
		});
	},
};
export default authAPI;
