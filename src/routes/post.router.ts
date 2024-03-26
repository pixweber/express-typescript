import express from "express";
import PostController from "../controllers/post.controller";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreatePostDto } from "../dto/post.create.dto";

const router = express.Router();

const postController = new PostController();

router.get("/", async (req, res) => {
  const response = await postController.getPosts();
  return res.send(response);
});

router.post("/", async (req, res) => {
  const createPostDto = plainToInstance(CreatePostDto, req.body);
  const errors = await validate(createPostDto);

  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  }

  const response = await postController.createPost(req.body);
  return res.send(response);
});

router.get("/:id", async (req, res) => {
  const response = await postController.getPostById(Number(req.params.id));

  if (!response) {
    return res.status(404).send({ message: "Post not found" });
  }

  return res.send(response);
});

export default router;
