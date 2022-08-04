import express from "express";

import {
	getPosts,
	getPostsBySearch,
	getPost,
	createPost,
	updatePost,
	likePost,
	deletePost,
	DislikePost
} from "../controllers/posts.js";

const router = express.Router();
import auth from "../middleware/auth.js";
router.get("/", getPosts);
router.get("/search", getPostsBySearch);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);
// router.patch("/:id/DislikePost", DislikePost);
// router.get('/', getPosts);
// router.post('/', createPost);
// router.get('/:id', getPost);
// router.patch('/:id', updatePost);
// router.delete('/:id', deletePost);
// router.patch('/:id/likePost', likePost);
// router.patch('/:id/DislikePost', DislikePost);

export default router;
