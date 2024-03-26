import dataSource from "../config/database";
import { Comment } from "../models/comment";

export interface ICommentPayload {
  postId: number;
  userId: number;
  content: string;
}

export const getComments = async (): Promise<Comment[]> => {
  return dataSource.getRepository(Comment).find();
}

export const createComment = async (payload: ICommentPayload): Promise<Comment> => {
  const comment = new Comment();
  comment.postId = payload?.postId;
  comment.userId = payload?.userId;
  comment.content = payload?.content;
  comment.createdAt = new Date();
  comment.updatedAt = new Date();
  return dataSource.getRepository(Comment).save(comment);
}

export const getCommentById = async (id: number): Promise<Comment | null> => {
  const comment = await dataSource.getRepository(Comment).findOneBy({
    id
  });

  if (!comment) {
    return null;
  }

  return comment;
}
