import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";

export class UserDto {

  @IsNotBlank({ message: "Name is required" })
  readonly name: string;

  @MaxLength(15, { message: "Username must be less than 15 characters" })
  @MinLength(5, { message: "Username must be at least 5 characters" })
  @IsNotBlank({ message: "userName is required" })
  readonly username: string;

  @IsEmail( {}, { message: "Email is not valid" })
  @IsNotBlank({ message: "email is required" })
  readonly email: string;

  @IsNotBlank({ message: "password is required" })
  readonly password: string;
}