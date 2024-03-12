import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUrl } from "class-validator";

export class CreateAiDto {
  @ApiProperty()
  @IsUrl()
  image_url: string;
}
