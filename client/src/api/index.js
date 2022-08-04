// import axios from "axios";

// const axiosInstance = axios.create({
// 	baseURL: "http://localhost:5000 || https://pixelverse.herokuapp.com"
// 	// baseURL: "http://localhost:5000"
// });

import { axiosInstance } from "../config";

const API = axiosInstance;

API.interceptors.request.use((req) => {
	if (localStorage.getItem("profile")) {
		req.headers.Authorization = `Bearer ${
			JSON.parse(localStorage.getItem("profile")).token
		}`;
	}

	return req;
});

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) =>
	API.get(
		`/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
			searchQuery.tags
		}`
	);
export const createPost = (newPost) => API.post("/posts", newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) =>
	API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => {
	console.log(formData);
	return API.post("/user/signin", formData);
};
export const signUp = (formData) => API.post("/user/signup", formData);
