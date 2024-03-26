import express from "express";
import UserController from "../controllers/user.controller";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreateUserDto } from "../dto/user.create.dto";
import { IsEmailAlreadyExistConstraint } from "../constraints/uniqueEmailConstraint";
const userController = new UserController();

const router = express.Router();

router.get("/", async (req, res) => {
  const response = await userController.getUsers();
  return res.send(response);
});

router.post("/", async (req, res) => {
  const createUserDto = plainToInstance(CreateUserDto, req.body);
  const errors = await validate(createUserDto);

  // Validate email uniqueness using custom validator
  const { email } = req.body;
  const constraints = new IsEmailAlreadyExistConstraint();
  const isValid = await constraints.validate(email);

  if (!isValid) {
    res.status(400).json({ error: 'Email already exists' });
    return;
  }

  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  }

  const response = await userController.createUser(req.body);
  return res.status(201).send(response);
});

router.get("/:id", async (req, res) => {
  const response = await userController.getUserById(Number(req.params.id));

  if (!response) {
    return res.status(404).send({ message: "User not found" });
  }

  return res.send(response);
});

export default router;
