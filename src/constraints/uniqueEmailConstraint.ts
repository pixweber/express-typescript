import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { User } from "../models/user";
import dataSource from "../config/database";

@ValidatorConstraint({ async: true })
export class IsEmailAlreadyExistConstraint implements ValidatorConstraintInterface {
  async validate(email: string) {
    const userRepository = dataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { email } });
    return !user; // Returns true if email does not exist in the database
  }

  defaultMessage(args: ValidationArguments) {
    return 'Email $value already exists'; // Error message if validation fails
  }
}
