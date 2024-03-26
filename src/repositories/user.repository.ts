import { User } from "../models/user";
import dataSource from "../config/database";

export interface IUserPayload {
  firstName: string;
  lastName: string;
  email: string;
}

export const getUsers = async (): Promise<User[]> => {
  return dataSource.getRepository(User).find();
}

export const createUser = async (payload: IUserPayload): Promise<User> => {
  const user = new User();
  user.firstName = payload?.firstName;
  user.lastName = payload?.lastName;
  user.email = payload?.email;
  user.createdAt = new Date();
  user.updatedAt = new Date();

  return dataSource.getRepository(User).save(user);
}

export const getUserById = async (id: number): Promise<User | null> => {
  return await dataSource.getRepository(User).findOneBy({
    id
  });
}
