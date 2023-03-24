import { mainAxios } from "./axiosConfig";
const ENDPOINT = `black-list`;
const blockAPI = {
  getBlackList: (phone: string) => {
    return mainAxios.post(`${ENDPOINT}/check-phone`, { phone });
  },
  blockUser: (blockedId: string) => {
    return mainAxios.post(`${ENDPOINT}`, { blockedId });
  },
};
export default blockAPI;
