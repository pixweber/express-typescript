import { Post } from "../models/post";
import dataSource from "../config/database";

export interface IPostPayload {
  title: string;
  content: string;
  userId: number;
}

export const getPosts = async (): Promise<Post[]> => {
  return dataSource.getRepository(Post).find();
}

export const createPost = async (payload: IPostPayload): Promise<Post> => {
  const post = new Post();
  post.title = payload?.title;
  post.content = payload?.content;
  post.userId = payload?.userId;
  post.createdAt = new Date();
  post.updatedAt = new Date();

  return dataSource.getRepository(Post).save(post);
}

export const getPostById = async (id: number): Promise<Post | null> => {
  const post = await dataSource.getRepository(Post).findOneBy({
    id
  });

  if (!post) {
    return null;
  }

  return post;
}
