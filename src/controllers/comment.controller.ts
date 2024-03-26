import { ICommentPayload, getComments, createComment, getCommentById } from "../repositories/comment.repository";
import { Body, Get, Path, Post, Route, Tags } from "tsoa";
import { Comment } from "../models/comment";

@Route("comments")
@Tags("Comment")
export default class CommentController {
  @Get("/")
  public async getComments(): Promise<Comment[]> {
    return getComments();
  }

  @Post("/")
  public async createComment(@Body() body: ICommentPayload): Promise<Comment> {
    return createComment(body);
  }

  @Get("/:id")
  public async getCommentById(@Path() id: number): Promise<Comment | null> {
    return getCommentById(id);
  }
}
