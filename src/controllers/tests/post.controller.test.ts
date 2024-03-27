import PostController from "../post.controller";
import { generatePostData, generatePostsData } from "../../test/utils/generate";

afterEach(() => {
  jest.clearAllMocks();
});

describe('PostController', () => {
  describe("getPosts", () => {
    it('should return empty array', async () => {
      const spy = jest
        .spyOn(PostController.prototype, 'getPosts')
        .mockResolvedValue([]);

      const controller = new PostController();
      const posts = await controller.getPosts();

      expect(posts).toEqual([]);
      expect(spy).toHaveBeenCalledWith();
      expect(spy).toHaveBeenCalledTimes(1);

      spy.mockRestore();
    });

    it('should return array of posts', async () => {
      const posts = generatePostsData(3);

      const spy = jest
        .spyOn(PostController.prototype, 'getPosts')
        .mockResolvedValue(posts);

      const controller = new PostController();
      const result = await controller.getPosts();

      expect(result).toEqual(posts);
      expect(spy).toHaveBeenCalledWith();
      expect(spy).toHaveBeenCalledTimes(1);

      spy.mockRestore();
    });
  });

  describe("createPost", () => {
    it('should return created post', async () => {
      const postData = generatePostData();
      const postPayload = {
        title: postData.title,
        content: postData.content,
        userId: postData.userId
      };

      const spy = jest
        .spyOn(PostController.prototype, 'createPost')
        .mockResolvedValueOnce(postData);

      const controller = new PostController();
      const post = await controller.createPost(postPayload);

      expect(post).toMatchObject(postPayload);
      expect(post).toEqual(postData);
      expect(spy).toHaveBeenCalledWith(postPayload);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe("getPostById", () => {
    test('should return post by id', async () => {
      const id = 1;
      const postData = generatePostData({id});
      const spy = jest
        .spyOn(PostController.prototype, 'getPostById')
        .mockResolvedValue(postData);

      const controller = new PostController();
      const post = await controller.getPostById(id);

      expect(post).toEqual(postData);
      expect(post?.id).toEqual(id);
      expect(spy).toHaveBeenCalledWith(id);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('should return null if post not found', async () => {
      const id = 1;
      const spy = jest
        .spyOn(PostController.prototype, 'getPostById')
        .mockResolvedValue(null);

      const controller = new PostController();
      const post = await controller.getPostById(id);
    });
  });
});
