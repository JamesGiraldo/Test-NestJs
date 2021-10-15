import { IsEnum } from "class-validator";
import { RoleType } from "./../rol.enum";

export class RolDto {

  @IsEnum(RoleType, { message: 'The entered value is invalid' } )
  roleName: string;
}