import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";

export class ProductDto {

  @IsNotBlank({ message: "Name is required" })
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  readonly price: number;
}