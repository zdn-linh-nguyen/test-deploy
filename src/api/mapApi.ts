import { mainAxios } from "./axiosConfig";
const ENDPOINT = `location`;

const mapAPI = {
  createLogin: (data: { long: number; lat: number }) => {
    return mainAxios.post(`${ENDPOINT}`, {
      long: data.long,
      lat: data.lat,
    });
  },

  getLocation: (range: number) => {
    return mainAxios.post(`${ENDPOINT}/get-within`, { range });
  },
};
export default mapAPI;
