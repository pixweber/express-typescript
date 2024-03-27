import CommentController from "../comment.controller";
import { generateCommentData, generateCommentsData } from "../../test/utils/generate";

afterEach(() => {
  jest.resetAllMocks();
});

describe('CommentController', () => {
  describe("getComments", () => {
    it('should return empty array', async () => {
      const spy = jest
        .spyOn(CommentController.prototype, 'getComments')
        .mockResolvedValueOnce([]);

      const controller = new CommentController();
      const comments = await controller.getComments();

      expect(comments).toEqual([]);
      expect(spy).toHaveBeenCalledWith();
      expect(spy).toHaveBeenCalledTimes(1);

      spy.mockRestore();
    });

    it('should return array of comments', async () => {
      const comments = generateCommentsData(3);

      const spy = jest
        .spyOn(CommentController.prototype, 'getComments')
        .mockResolvedValue(comments);

      const controller = new CommentController();
      const result = await controller.getComments();

      expect(result).toEqual(comments);
      expect(spy).toHaveBeenCalledWith();
      expect(spy).toHaveBeenCalledTimes(1);

      spy.mockRestore();
    });
  });

  describe("createComment", () => {
    test('should return created comment', async () => {
      const commentData = generateCommentData();
      const commentPayload = {
        content: commentData.content,
        userId: commentData.userId,
        postId: commentData.postId
      };

      const spy = jest
        .spyOn(CommentController.prototype, 'createComment')
        .mockResolvedValueOnce(commentData);

      const controller = new CommentController();
      const comment = await controller.createComment(commentPayload);

      expect(comment).toMatchObject(commentPayload);
      expect(comment).toEqual(commentData);
      expect(spy).toHaveBeenCalledWith(commentPayload);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe("getComment", () => {
    test('should return comment', async () => {
      const commentData = generateCommentData();
      const id = commentData.id;

      const spy = jest
        .spyOn(CommentController.prototype, 'getCommentById')
        .mockResolvedValueOnce(commentData);

      const controller = new CommentController();
      const comment = await controller.getCommentById(id);

      expect(comment).toEqual(commentData);
      expect(spy).toHaveBeenCalledWith(id);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('should return null', async () => {
      const id = 1;
      const spy = jest
        .spyOn(CommentController.prototype, 'getCommentById')
        .mockResolvedValueOnce(null);

      const controller = new CommentController();
      const comment = await controller.getCommentById(id);
    });
  });
});
