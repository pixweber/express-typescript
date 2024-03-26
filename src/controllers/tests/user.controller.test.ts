import UserController from "../user.controller";
import { generateUsersData } from "../../../test/utils/generate";

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
});
