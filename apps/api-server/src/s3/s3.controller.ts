import { Controller, Get, ParseIntPipe, Query } from "@nestjs/common";
import { ApiProperty, ApiResponse, ApiTags } from "@nestjs/swagger";

import { S3Service } from "./s3.service";

class SignedPostUrlResponse {
  @ApiProperty()
  url: string;
  @ApiProperty()
  key: string;
}

@ApiTags("s3")
@Controller("s3")
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Get("signed-post-url")
  @ApiResponse({
    status: 200,
    type: SignedPostUrlResponse,
  })
  getSignedPostUrl(@Query("userId", ParseIntPipe) userId: number) {
    return this.s3Service.getSignedPostUrl(userId);
  }

  @Get("signed-get-url")
  @ApiResponse({
    status: 200,
    type: String,
  })
  getSignedGetUrl(
    @Query("s3key")
    s3key: string,
  ) {
    return this.s3Service.getSignedGetUrl(s3key);
  }
}
