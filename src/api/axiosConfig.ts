import axios from "axios";
const MAIN_URL = "https://e7d3-115-79-210-160.ngrok.io";

const mainAxios = axios.create({
	baseURL: MAIN_URL,
});

axios.defaults.headers.post["Content-Type"] = "application/json";

mainAxios.interceptors.request.use((config) => {
	const token = localStorage.getItem("token");
	config.headers.Authorization = `Bearer ${token}`;
	return config;
});

mainAxios.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		console.error(`Error status: ${error.response.status}`);
		console.error(`Error message: ${error.message}`);
		return Promise.reject(error);
	}
);

export { mainAxios };
