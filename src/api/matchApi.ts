import { mainAxios } from "./axiosConfig";
const ENDPOINT = `match`;

const matchAPI = {
	getMyMatch: () => {
		return mainAxios.get(`${ENDPOINT}`);
	},
	addMatch: (matchedId: string) => {
		return mainAxios.post(`${ENDPOINT}`, { matchedId });
	},
};
export default matchAPI;
