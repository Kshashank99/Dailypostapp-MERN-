import axios from "axios";

export const axiosInstance = axios.create({
	// baseURL: "https://pixelverse.herokuapp.com"
	baseURL: "http://localhost:5000"
});
