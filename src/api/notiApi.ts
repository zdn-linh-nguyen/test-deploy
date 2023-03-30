import { mainAxios } from "./axiosConfig";
const ENDPOINT = "notification";

const notiApi = {
  getAllNoti: () => {
    return mainAxios.get(`${ENDPOINT}`);
  },
};
export default notiApi;
