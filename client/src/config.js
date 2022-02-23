import axios from "axios";

export const axiosInstance = axios.create({
	baseURL: "https://pixel-verse.herokuapp.com/"
});
