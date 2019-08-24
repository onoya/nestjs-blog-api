import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { getRepository } from 'typeorm';
import { User } from './user/user.entity';

@ValidatorConstraint({ async: true })
export class IsEmailTakenConstraint implements ValidatorConstraintInterface {
  async validate(email: string, args: ValidationArguments): Promise<boolean> {
    const user = await getRepository(User).findOne({ where: { email } });
    return !user;
  }

  defaultMessage(args: ValidationArguments) {
    return 'The email is already taken';
  }
}

export function IsEmailTaken(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsEmailTakenConstraint,
    });
  };
}
