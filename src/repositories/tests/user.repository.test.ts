import * as UserRepository from '../user.repository';
import mocked = jest.mocked;
import { generateUserData, generateUsersData } from "../../test/utils/generate";
import dataSource from "../../config/database";

const user = generateUserData({ id : 1})

jest.mock("../../config/database", () => {
  return {
    dataSource: {
      getRepository: jest.fn().mockReturnValue({
        save: jest.fn().mockResolvedValue(user), // Mock save method if needed
        findOne: jest.fn().mockResolvedValue(user), // Mock findOne method if needed
      }),
    }
  };
});

jest.mock('typeorm', () => {
  return {
    DataSource: jest.fn().mockImplementation(() => ({
      getRepository: jest.fn().mockReturnValue({
        // Mock the methods of UserRepository as needed
        save: jest.fn(),
        findOne: jest.fn(),
        // Add more mocked methods as needed
      }),
    })),
    PrimaryGeneratedColumn: jest.fn(),
    Column: jest.fn(),
    Entity: jest.fn(),
    Unique: jest.fn(),
    ManyToOne: jest.fn(),
    OneToMany: jest.fn(),
    JoinColumn: jest.fn(),
    CreateDateColumn: jest.fn(),
    UpdateDateColumn: jest.fn()
  };
});

const mockedGetRepo = mocked(dataSource.getRepository(<jest.Mock>{}));
describe('UserRepository', () => {
  describe('getUsers', () => {
    it('should return empty array', async () => {
      mockedGetRepo.find.mockResolvedValue([]);

      const users = await UserRepository.getUsers();

      expect(users).toEqual([]);
      expect(mockedGetRepo.find).toHaveBeenCalledTimes(1);
    });

    it('should return array of users', async () => {
      const usersData = generateUsersData(2);
      mockedGetRepo.find.mockResolvedValue(usersData);

      const users = await UserRepository.getUsers();
      expect(users).toEqual(usersData);
      expect(mockedGetRepo.find).toHaveBeenCalledTimes(1);
      expect(mockedGetRepo.find).toHaveBeenCalledWith();
    });
  });
});
