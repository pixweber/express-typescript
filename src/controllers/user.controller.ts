import { Body, Get, Post, Route, Tags, Path } from "tsoa";
import { getUsers, createUser, getUserById, IUserPayload } from "../repositories/user.repository";
import { User } from "../models/user";

@Route("users")
@Tags("User")
export default class UserController {
  @Get("/")
  public async getUsers(): Promise<User[]> {
    return getUsers();
  }

  @Post("/")
  public async createUser(@Body() body: IUserPayload): Promise<User> {
    return createUser(body);
  }

  @Get("/:id")
  public async getUserById(@Path() id: number): Promise<User | null> {
    return getUserById(id);
  }
}
