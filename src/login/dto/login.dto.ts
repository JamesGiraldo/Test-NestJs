import { MaxLength, MinLength } from "class-validator";

import { IsNotBlank } from "../../decorators/is-not-blank.decorator";

export class LoginDto {

  @MaxLength(50, { message: "Username must be less than 15 characters" })
  @MinLength(5, { message: "Username must be at least 5 characters" })
  @IsNotBlank({ message: "userName is required" })
  readonly username: string;

  @IsNotBlank({ message: "password is required" })
  readonly password: string;
}