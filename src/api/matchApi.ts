import { mainAxios } from "./axiosConfig";
const ENDPOINT = `match`;

const matchAPI = {
	addMatch: (matchedId: string) => {
		return mainAxios.post(`${ENDPOINT}`, { matchedId });
	},
};
export default matchAPI;
