import { mainAxios } from "./axiosConfig";
const ENDPOINT = `user`;
const userAPI = {
  checkPhone: (phone: string) => {
    return mainAxios.post(`${ENDPOINT}/check-phone`, { phone });
  },
  checkSocial: (socialId: string) => {
    return mainAxios.post(`${ENDPOINT}/check-social`, { socialId });
  },
};
export default userAPI;
