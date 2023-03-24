import { IProfileUpdateData } from "@/types/interface";
import { mainAxios } from "./axiosConfig";
const ENDPOINT = `profile`;
const profileAPI = {
	getProfile: () => {
		return mainAxios.get(`${ENDPOINT}`);
	},
	updateProfile: async (profile: IProfileUpdateData) => await mainAxios.put(`${ENDPOINT}`, profile),
};
export default profileAPI;
