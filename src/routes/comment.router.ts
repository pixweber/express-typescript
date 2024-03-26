import express from "express";
import CommentController from "../controllers/comment.controller";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreateCommentDto } from "../dto/comment.create.dto";

const commentController = new CommentController();

const router = express.Router();

router.get("/", async (req, res) => {
  const response = await commentController.getComments();
  return res.send(response);
});

router.post("/", async (req, res) => {
  const createCommentDto = plainToInstance(CreateCommentDto, req.body);
  const errors = await validate(createCommentDto);

  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  }
  const response = await commentController.createComment(req.body);
  return res.send(response);
});

router.get("/:id", async (req, res) => {
  const response = await commentController.getCommentById(Number(req.params.id));

  if (!response) {
    return res.status(404).send({ message: "Comment not found" });
  }

  return res.send(response);
});

export default router;
