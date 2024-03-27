import UserController from "../user.controller";
import { generateUserData, generateUsersData } from "../../test/utils/generate";

describe('UserController', () => {
  describe("getUsers", () => {
    it('should return empty array', async () => {
      const spy = jest
        .spyOn(UserController.prototype, 'getUsers')
        .mockResolvedValue([]);

      const controller = new UserController();
      const users = await controller.getUsers();

      expect(users).toEqual([]);
      expect(spy).toHaveBeenCalledWith();
      expect(spy).toHaveBeenCalledTimes(1);

      spy.mockRestore();
    });

    it('should return array of users', async () => {
      const users = generateUsersData(3);

      const spy = jest
        .spyOn(UserController.prototype, 'getUsers')
        .mockResolvedValue(users);

      const controller = new UserController();
      const result = await controller.getUsers();

      expect(result).toEqual(users);
      expect(spy).toHaveBeenCalledWith();
      expect(spy).toHaveBeenCalledTimes(1);

      spy.mockRestore();
    });
  });

  describe("createUser", () => {
    it('should return created user', async () => {
      const userData = generateUserData();
      const userPayload = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email
      };

      const spy = jest
        .spyOn(UserController.prototype, 'createUser')
        .mockResolvedValueOnce(userData);

      const controller = new UserController();
      const user = await controller.createUser(userPayload);

      expect(user).toMatchObject(userPayload);
      expect(user).toEqual(userData);
      expect(spy).toHaveBeenCalledWith(userPayload);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe("getUserById", () => {
    it('should return an user from the database', async () => {
      const id = 1;
      const userData = generateUserData({id});
      const spy = jest
        .spyOn(UserController.prototype, 'getUserById')
        .mockResolvedValueOnce(userData);

      const controller = new UserController();
      const user = await controller.getUserById(id);

      expect(user).toEqual(userData);
      expect(user?.id).toBe(id);
      expect(spy).toHaveBeenCalledWith(id);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should return null if not found', async () => {
      const id = 0;
      const spy = jest
        .spyOn(UserController.prototype, 'getUserById')
        .mockResolvedValue(null);

      const controller = new UserController();
      const user = await controller.getUserById(id);
    });
  });
});
