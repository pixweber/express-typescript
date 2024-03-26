import express from "express";
import PingController from "../controllers/ping.controller";
import UserRouter from "./user.router";
import PostRouter from "./post.router";
import CommentRouter from "./comment.router";

const router = express.Router();

router.get('/ping', async (req, res) => {
  const pingController = new PingController();
  const result = await pingController.getMessage();
  res.json(result);
});

router.use("/users", UserRouter);
router.use("/posts", PostRouter);
router.use("/comments", CommentRouter);

export default router;
