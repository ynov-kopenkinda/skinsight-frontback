import { ApiProperty } from "@nestjs/swagger";
import { IsUrl } from "class-validator";

export class CreateAiDto {
  @ApiProperty()
  @IsUrl()
  image_url: string;
}
