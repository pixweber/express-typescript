import { Body, Get, Path, Route, Tags, Post as PostMethod } from "tsoa";
import { Post } from "../models/post";
import { IPostPayload, getPosts, createPost, getPostById } from "../repositories/post.repository";

@Route("posts")
@Tags("Post")
export default class PostController {
  @Get("/")
  public async getPosts(): Promise<Post[]> {
    return getPosts();
  }

  @PostMethod("/")
  public async createPost(@Body() body: IPostPayload): Promise<Post> {
    return createPost(body);
  }

  @Get("/:id")
  public async getPostById(@Path() id: number): Promise<Post | null> {
    return getPostById(id);
  }
}
